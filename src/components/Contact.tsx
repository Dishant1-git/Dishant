"use client";

import { useRef, useState } from "react";
import { gsap, useGsap, revealWords, prefersReducedMotion } from "@/lib/anim";
import { profile } from "@/lib/data";
import Magnetic from "./Magnetic";
import ContactForm from "./ContactForm";

const openTo = ["Full-time roles", "Freelance projects", "Collaborations"];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGsap(
    () => {
      const el = root.current!;
      revealWords(el.querySelector<HTMLElement>(".ct-title")!, { stagger: 0.05 });

      gsap.from(el.querySelectorAll(".ct-fade"), {
        y: 34,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });

      if (!prefersReducedMotion()) {
        gsap.to(el.querySelector(".ct-glow"), {
          scale: 1.35,
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 1 },
        });
      }
    },
    [],
    root,
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden px-5 pt-24 pb-16 sm:px-8 sm:pt-32"
    >
      <div className="ct-glow glow-mint pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[62vw] w-[62vw] max-h-[700px] max-w-[700px] -translate-x-1/2 opacity-70" />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-baseline gap-4">
          <span className="text-mint font-mono text-[11px] tracking-[0.2em]">05</span>
          <span className="label">Contact</span>
        </div>
        <div className="bg-line mt-3 h-px w-full" />

        <div className="mt-14 flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <h2
              data-anim
              className="ct-title display text-[clamp(2.4rem,9vw,7.5rem)]"
            >
              Let&apos;s build <span className="text-mint">something</span>
            </h2>

            <p className="ct-fade text-sand-dim mt-8 max-w-lg text-[15px] leading-relaxed sm:text-base">
              I&apos;m open to full-time positions, freelance work and collaborative
              projects. Tell me what you&apos;re building and I&apos;ll tell you how
              I&apos;d approach it.
            </p>
          </div>

          <ul className="ct-fade shrink-0 space-y-3">
            {openTo.map((o) => (
              <li key={o} className="text-sand-dim flex items-center gap-3 text-sm">
                <span className="bg-mint h-1.5 w-1.5 rotate-45" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="ct-fade mt-14 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.32}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="WRITE"
              className="bg-mint text-forest-deep inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase"
            >
              Email me
              <span aria-hidden>→</span>
            </a>
          </Magnetic>

          <button
            onClick={copy}
            data-cursor="COPY"
            className="border-line text-sand-dim hover:border-sand hover:text-sand inline-flex items-center gap-3 rounded-full border px-8 py-4 font-mono text-[11px] tracking-[0.14em] transition-colors"
          >
            <span className="hidden sm:inline">{profile.email}</span>
            <span className="sm:hidden">Copy email</span>
            <span className={copied ? "text-mint" : ""}>{copied ? "COPIED ✓" : "⧉"}</span>
          </button>

          <Magnetic strength={0.32}>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              className="border-line text-sand-dim hover:border-sand hover:text-sand inline-flex items-center gap-3 rounded-full border px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            >
              GitHub ↗
            </a>
          </Magnetic>
        </div>

        <div className="ct-fade border-line mt-20 border-t pt-14 md:mt-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label">Or send a message</p>
              <p className="text-sand-dim mt-4 max-w-xs text-[15px] leading-relaxed">
                Straight to my inbox. The more you tell me about the project, the
                timeline and the stack, the more useful my first reply will be.
              </p>
            </div>
            <div className="md:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
