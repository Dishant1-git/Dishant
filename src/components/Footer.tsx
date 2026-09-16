"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

export default function Footer() {
  const [time, setTime] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer ref={ref} className="border-line border-t px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-mint h-2 w-2 rounded-full" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
            {profile.name}
          </span>
        </div>

        <div className="text-muted flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] uppercase">
          <span>{profile.location} — {time || "--:--"} IST</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="link-wipe hover:text-sand transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="link-wipe hover:text-sand transition-colors"
          >
            Email
          </a>
          <a href="#top" className="link-wipe hover:text-sand transition-colors">
            Back to top ↑
          </a>
        </div>

        <span className="text-muted font-mono text-[10px] tracking-[0.16em]">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
