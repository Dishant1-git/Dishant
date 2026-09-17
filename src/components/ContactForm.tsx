"use client";

import { useState } from "react";

/* Web3Forms access keys are public by design: this one only authorises posting
   to the inbox it belongs to, and it is served to every visitor in the client
   bundle no matter where it is stored. Do not copy this pattern for a real
   secret — anything that must stay private belongs on the server. */
const ACCESS_KEY = "cb96f9a1-ecd0-4a25-a0d7-424eb9677ba6";
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Tell me what to call you.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "That address doesn't look right.";
  if (values.message.trim().length < 10) errors.message = "A little more detail, please.";
  return errors;
}

const fieldClass =
  "border-line bg-surface/30 text-sand placeholder:text-muted/70 focus:border-mint w-full rounded-lg border px-4 py-3.5 text-[15px] outline-none transition-colors focus:bg-surface/50";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [note, setNote] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see this field, bots fill it in.
    if (data.get("botcheck")) return;

    const values: Record<Field, string> = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validate(values);
    setErrors(found);
    // Focus by name, not by [aria-invalid] — React has not re-rendered yet.
    const firstBad = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setNote("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "Portfolio contact form",
          subject: `New message from ${values.name.trim()}`,
          ...values,
        }),
      });
      const json: { success?: boolean; message?: string } = await res.json();

      if (!res.ok || !json.success) throw new Error(json.message ?? "Send failed");

      form.reset();
      setStatus("sent");
      setNote("Message sent. I'll reply within a day or two.");
    } catch {
      setStatus("error");
      setNote("That didn't go through. Email me directly and I'll pick it up.");
    }
  };

  // Typing again clears that field's error and any stale send receipt.
  const clearError = (field: Field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    setStatus((prev) => (prev === "sent" || prev === "error" ? "idle" : prev));
    setNote((prev) => (prev ? "" : prev));
  };

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from people and from screen readers alike */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            onChange={() => clearError("name")}
            className={`${fieldClass} mt-3 ${errors.name ? "border-amber" : ""}`}
          />
          {errors.name && (
            <p id="name-error" className="text-amber mt-2 font-mono text-[11px]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            onChange={() => clearError("email")}
            className={`${fieldClass} mt-3 ${errors.email ? "border-amber" : ""}`}
          />
          {errors.email && (
            <p id="email-error" className="text-amber mt-2 font-mono text-[11px]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building, and what do you need from me?"
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          onChange={() => clearError("message")}
          className={`${fieldClass} mt-3 resize-y ${errors.message ? "border-amber" : ""}`}
        />
        {errors.message && (
          <p id="message-error" className="text-amber mt-2 font-mono text-[11px]">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor="SEND"
          className="bg-mint text-forest-deep hover:bg-mint-deep inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <span aria-hidden>{status === "sent" ? "✓" : "→"}</span>
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`font-mono text-[11px] tracking-[0.06em] ${
            status === "error" ? "text-amber" : "text-mint"
          }`}
        >
          {note}
        </p>
      </div>
    </form>
  );
}
