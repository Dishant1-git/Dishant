"use client";

import { useRef, useState } from "react";
import { gsap, useGsap, prefersReducedMotion, scramble } from "@/lib/anim";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/lib/data";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGsap(() => {
    if (prefersReducedMotion()) {
      markIntroDone();
      setGone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const count = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        markIntroDone();
        setGone(true);
      },
    });

    tl.set(".pl-panel", { yPercent: 0 })
      .to(
        count,
        {
          v: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) {
              counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
            }
          },
        },
        0,
      )
      .to(bar.current, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0)
      .add(() => {
        if (nameRef.current) scramble(nameRef.current, profile.name, 1.1);
      }, 0.35)
      .to([counter.current, nameRef.current, bar.current], {
        autoAlpha: 0,
        y: -14,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.05,
      })
      .to(".pl-panel", {
        yPercent: -100,
        duration: 1.05,
        ease: "expo.inOut",
        stagger: 0.07,
      });

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[90]" aria-hidden>
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="pl-panel bg-forest-deep h-full flex-1" />
        ))}
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6">
        <span
          ref={nameRef}
          className="display text-sand text-center text-[clamp(2rem,7vw,5rem)]"
        />
        <span
          ref={bar}
          className="bg-mint block h-px w-[min(320px,60vw)] origin-left scale-x-0"
        />
        <span ref={counter} className="font-mono text-mint text-xs tracking-[0.3em]">
          000
        </span>
      </div>
    </div>
  );
}
