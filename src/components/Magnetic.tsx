"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/anim";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Pulls its child toward the pointer while hovered. */
export default function Magnetic({ children, strength = 0.42, className }: Props) {
  const wrap = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.42)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.42)" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <span ref={wrap} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
