"use client";

import { useRef } from "react";
import { gsap, useGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/anim";
import { marqueeWords } from "@/lib/data";

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>(".mq-track")!;

      // Two copies sit side by side; shifting by -50% loops seamlessly.
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      // Scroll direction flips the marquee, velocity nudges its speed
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-2.6, 2.6, self.getVelocity() / 320);
          tween.timeScale(self.direction === -1 ? -(1 + Math.abs(v)) : 1 + Math.abs(v));
          gsap.to(track, { skewX: gsap.utils.clamp(-7, 7, -v * 1.4), duration: 0.5, overwrite: true });
        },
        onLeave: () => tween.timeScale(1),
      });

      gsap.from(root.current, {
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });
    },
    [],
    root,
  );

  const row = [...marqueeWords, ...marqueeWords];

  return (
    <div
      ref={root}
      className="border-line bg-forest-deep/50 relative overflow-hidden border-y py-6 select-none"
    >
      <div className="mq-track flex w-max items-center">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="display text-sand-dim/70 px-8 text-[clamp(1.6rem,4vw,3rem)] whitespace-nowrap">
              {w}
            </span>
            <span className="bg-mint h-1.5 w-1.5 shrink-0 rotate-45" />
          </span>
        ))}
      </div>
      <div className="from-forest pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent sm:w-32" />
      <div className="from-forest pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent sm:w-32" />
    </div>
  );
}
