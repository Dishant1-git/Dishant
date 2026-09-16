"use client";

import { useRef } from "react";
import { gsap, useGsap, splitChars, scramble, prefersReducedMotion } from "@/lib/anim";
import { introDone } from "@/lib/intro";
import { profile, stats } from "@/lib/data";
import Magnetic from "./Magnetic";
import CartoonStatic from "./Cartoon";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useGsap(
    () => {
      const reduce = prefersReducedMotion();
      const l1 = splitChars(document.querySelector<HTMLElement>(".hero-l1")!);
      const l2 = splitChars(document.querySelector<HTMLElement>(".hero-l2")!);
      gsap.set(".hero-anim", { autoAlpha: 1 });

      if (reduce) {
        gsap.set([...l1, ...l2, ".hero-fade", ".hero-stat"], { clearProps: "all" });
        if (roleRef.current) roleRef.current.textContent = profile.role;
        return;
      }

      const tl = gsap.timeline({ paused: true });

      tl.from([...l1, ...l2], {
        yPercent: 130,
        rotateX: -70,
        autoAlpha: 0,
        duration: 1.25,
        ease: "expo.out",
        stagger: { each: 0.026, from: "start" },
      })
        .from(".hero-rule", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, "-=0.9")
        .add(() => {
          if (roleRef.current) scramble(roleRef.current, profile.role, 1.0);
        }, "-=1.0")
        .from(".hero-fade", { y: 34, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 }, "-=0.85")
        .from(".hero-stat", { y: 24, autoAlpha: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, "-=0.7")
        .from(".hero-scroll", { autoAlpha: 0, duration: 0.8 }, "-=0.5");

      introDone.then(() => tl.play());

      // Parallax on scroll out
      gsap.to(".hero-title-wrap", {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-glow", {
        yPercent: 34,
        scale: 1.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-grid", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.4 },
      });

      // Pointer parallax
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-glow", { x: nx * 90, y: ny * 60, duration: 1.6, ease: "power3.out" });
        gsap.to(".hero-title-wrap", { x: nx * 16, duration: 1.8, ease: "power3.out" });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    [],
    root,
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-8"
    >
      {/* backdrop */}
      <div className="hero-grid grid-lines pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-glow glow-mint pointer-events-none absolute -top-[18%] left-1/2 -z-10 h-[70vw] w-[70vw] max-h-[820px] max-w-[820px] -translate-x-1/2 blur-[10px]" />
      <div className="glow-amber pointer-events-none absolute -right-[10%] bottom-[6%] -z-10 h-[36vw] w-[36vw] max-h-[460px] max-w-[460px] opacity-70" />

      <div className="hero-anim relative mx-auto w-full max-w-[1400px] px-5 opacity-0 sm:px-8">
        {/* top meta row */}
        {/* meta row — kept clear of the centred mascot */}
        <div className="hero-fade text-muted flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="flex items-center gap-4">
            Portfolio — 2026
            <span className="bg-line hidden h-3 w-px sm:block" />
            <span className="hidden sm:block">Based in {profile.location}</span>
          </span>
          <span>{profile.githubHandle}</span>
        </div>

        <div className="hero-rule bg-line mt-4 h-px w-full origin-left" />

        {/* headline — sits behind the mascot */}
        <div className="hero-title-wrap mt-10 sm:mt-16">
          <h1 className="display text-center text-[clamp(2.7rem,11vw,9.5rem)]">
            <span className="hero-l1 block sm:inline" style={{ perspective: 700 }}>
              Dishant
            </span>{" "}
            <span className="hero-l2 text-mint block sm:inline" style={{ perspective: 700 }}>
              Kaushal
            </span>
          </h1>
        </div>

        {/* Landing spot for the mascot — the flying copy tracks this box.
            In flow on mobile, centred and overlapping the name from sm up. */}
        <div
          id="cartoon-hero-slot"
          aria-hidden
          className="pointer-events-none relative mx-auto -mt-2 aspect-[584/1653] w-[min(27vw,108px)] sm:absolute sm:bottom-0 sm:left-1/2 sm:mt-0 sm:w-[min(190px,19.5vh,16vw)] sm:-translate-x-1/2"
        >
          <div className="cartoon-static h-full w-full">
            <CartoonStatic className="h-full w-full" />
          </div>
        </div>

        {/* role + intro, flanking the mascot on desktop */}
        <div className="mt-8 grid gap-8 sm:mt-12 md:grid-cols-12">
          <div className="hero-fade md:col-span-4">
            <p className="label mb-3">Currently</p>
            <span
              ref={roleRef}
              className="text-sand font-mono text-sm tracking-[0.12em] sm:text-base"
            >
              {profile.role}
            </span>
            <p className="text-sand-dim mt-6 text-[15px] leading-relaxed">
              {profile.intro}
            </p>
          </div>

          {/* CTAs — right of the mascot on desktop, stacked below on mobile */}
          <div className="hero-fade mt-2 flex flex-wrap items-center gap-4 md:col-span-4 md:col-start-9 md:mt-0 md:flex-col md:items-end">
            <p className="label mb-1 hidden w-full text-right md:block">Start here</p>
            <Magnetic strength={0.35}>
              <a
                href="#work"
                data-cursor="VIEW"
                className="bg-mint text-forest-deep inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-transform"
              >
                See the work
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="border-line text-sand hover:border-sand inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
              >
                GitHub
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="link-wipe text-muted hover:text-sand hidden font-mono text-[11px] tracking-[0.1em] transition-colors md:mt-2 md:block"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="mx-auto mt-14 w-full max-w-[1400px] px-5 sm:px-8">
        <div className="border-line grid grid-cols-2 gap-px border-t md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat py-5 pr-4">
              <div className="display text-sand text-3xl sm:text-4xl">{s.value}</div>
              <div className="text-muted mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="hero-scroll text-muted mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="bg-line relative h-8 w-px overflow-hidden">
            <span className="bg-mint absolute inset-x-0 top-0 h-3 animate-[scrollLine_1.8s_ease-in-out_infinite]" />
          </span>
          Scroll to explore
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(340%); }
        }
      `}</style>
    </section>
  );
}
