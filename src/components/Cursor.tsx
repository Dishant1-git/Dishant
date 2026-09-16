"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const d = dot.current!;
    const r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dx = gsap.quickTo(d, "x", { duration: 0.18, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.18, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([d, r], { autoAlpha: 1, duration: 0.4 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>("[data-cursor]");
      if (el) {
        setLabel(el.dataset.cursor || "");
        gsap.to(r, { scale: el.dataset.cursor ? 2.9 : 2.1, borderColor: "var(--color-mint)", duration: 0.45, ease: "expo.out" });
        gsap.to(d, { scale: 0, duration: 0.35 });
      } else {
        setLabel("");
        gsap.to(r, { scale: 1, borderColor: "var(--color-muted)", duration: 0.45, ease: "expo.out" });
        gsap.to(d, { scale: 1, duration: 0.35 });
      }
    };

    const leave = () => {
      shown = false;
      gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ring}
        className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-muted"
      >
        <span className="font-mono text-[7px] tracking-[0.14em] text-mint uppercase">
          {label}
        </span>
      </div>
      <div ref={dot} className="bg-mint absolute top-0 left-0 h-1.5 w-1.5 rounded-full" />
    </div>
  );
}
