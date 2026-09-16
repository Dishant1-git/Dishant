"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";
import Cartoon from "./Cartoon";

/** Must match public/cartoon.png's intrinsic size, and the slot aspect ratios in Hero/About. */
const BASE_W = 584;
const BASE_H = 1653;

/**
 * A single fixed-position character that tracks two invisible slots:
 * #cartoon-hero-slot and #cartoon-about-slot. Scroll progress between them drives
 * position, scale and a slight arc, so the character appears to fly from the hero
 * down into the About card. Both slot rects are read live each frame, so it stays
 * locked to the About card after landing and survives resize with no recalculation.
 */
export default function CartoonFlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = ref.current;
    const heroSlot = document.getElementById("cartoon-hero-slot");
    const aboutSlot = document.getElementById("cartoon-about-slot");
    if (!el || !heroSlot || !aboutSlot) return;

    gsap.set(el, { transformOrigin: "50% 50%", autoAlpha: 0 });

    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const cur = { x: 0, y: 0, s: 1, r: 0 };
    let started = false;

    const tick = () => {
      const hr = heroSlot.getBoundingClientRect();
      const ar = aboutSlot.getBoundingClientRect();
      if (!hr.width || !ar.width) return;

      const scrollY = window.scrollY;
      const aboutDocY = ar.top + scrollY;
      const end = Math.max(1, aboutDocY - window.innerHeight * 0.42);
      const raw = gsap.utils.clamp(0, 1, scrollY / end);
      const p = easeInOut(raw);

      // arc sideways and tilt through the middle of the flight
      const swing = Math.sin(raw * Math.PI);
      const width = lerp(hr.width, ar.width, p);

      const tx =
        lerp(hr.left + hr.width / 2, ar.left + ar.width / 2, p) - swing * 70 - BASE_W / 2;
      const ty = lerp(hr.top + hr.height / 2, ar.top + ar.height / 2, p) - BASE_H / 2;
      const ts = width / BASE_W;
      const tr = -swing * 8;

      if (!started) {
        cur.x = tx;
        cur.y = ty;
        cur.s = ts;
        cur.r = tr;
        started = true;
        gsap.set(el, { autoAlpha: 1 });
      } else {
        const k = 0.16;
        cur.x += (tx - cur.x) * k;
        cur.y += (ty - cur.y) * k;
        cur.s += (ts - cur.s) * k;
        cur.r += (tr - cur.r) * k;
      }

      // gsap.set (not quickSetter) — quickSetter silently ignores scale/rotation here
      gsap.set(el, { x: cur.x, y: cur.y, scale: cur.s, rotation: cur.r });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cartoon-flight pointer-events-none fixed top-0 left-0 z-30 invisible"
      style={{ width: BASE_W, height: BASE_H }}
    >
      <Cartoon className="h-full w-full" />
    </div>
  );
}
