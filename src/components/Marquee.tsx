"use client";

import { useEffect, useRef } from "react";
import { marqueeWords } from "@/lib/data";

/* Duplicated four times so the strip stays wider than any viewport; the CSS
   keyframes slide the track by exactly half its width, which puts copy 3 where
   copy 1 began — an unbroken loop with no JS driving the motion. */
const COPIES = 4;

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  // Scrolling speeds the strip up and skews it slightly — pure garnish; the
  // loop itself keeps running if this never fires.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = el.querySelector<HTMLElement>(".mq-track");
    // getAnimations lets us retime the running loop without restarting it;
    // where it is missing the strip simply scrolls at its constant CSS speed.
    const loop = track?.getAnimations?.()[0];

    let lastY = window.scrollY;
    let lastT = performance.now();
    let frame = 0;
    let idle = 0;

    const settle = () => {
      if (loop) loop.playbackRate = 1;
      el.style.setProperty("--mq-skew", "0deg");
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const now = performance.now();
        const dt = Math.max(now - lastT, 16);
        const dy = window.scrollY - lastY;
        lastY = window.scrollY;
        lastT = now;

        // px per ms -> 0 at rest, ~1 on a brisk flick
        const v = Math.min(Math.abs(dy) / dt / 3, 1);
        if (loop) loop.playbackRate = 1 + v * 2.2;
        el.style.setProperty("--mq-skew", `${-Math.sign(dy) * v * 6}deg`);

        window.clearTimeout(idle);
        idle = window.setTimeout(settle, 220);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={root}
      className="border-line bg-forest-deep/50 relative overflow-hidden border-y py-6 select-none"
      aria-label={`Tech stack: ${marqueeWords.join(", ")}`}
    >
      <div className="mq-track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div className="mq-group" key={copy} aria-hidden={copy > 0}>
            {marqueeWords.map((w) => (
              <span className="flex items-center" key={w}>
                <span className="display text-sand-dim/70 px-8 text-[clamp(1.6rem,4vw,3rem)] whitespace-nowrap">
                  {w}
                </span>
                <span className="bg-mint h-1.5 w-1.5 shrink-0 rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="from-forest pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent sm:w-32" />
      <div className="from-forest pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent sm:w-32" />
    </div>
  );
}
