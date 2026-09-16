"use client";

import { useRef } from "react";
import { gsap, useGsap, ScrollTrigger, revealWords } from "@/lib/anim";
import { caseStudies, type CaseStudy } from "@/lib/data";
import ProjectVisual from "./ProjectVisual";
import Magnetic from "./Magnetic";

function Panel({ study }: { study: CaseStudy }) {
  const accentText = study.accent === "mint" ? "text-mint" : "text-amber";
  const accentBorder = study.accent === "mint" ? "border-mint" : "border-amber";

  return (
    <article className="work-panel flex w-[86vw] shrink-0 flex-col justify-center gap-8 md:w-[74vw] lg:w-[62vw] lg:flex-row lg:items-center lg:gap-12">
      <div className="w-full lg:w-[46%]">
        <div className="flex items-center gap-4">
          <span className={`panel-el font-mono text-[11px] tracking-[0.2em] ${accentText}`}>
            {study.index}
          </span>
          <span className="panel-el bg-line h-px flex-1" />
          <span className="panel-el label !text-muted">{study.year}</span>
        </div>

        <p className="panel-el panel-kind label mt-6">{study.kind}</p>
        <h3 className="panel-el panel-title display mt-3 text-[clamp(1.9rem,4.4vw,3.5rem)]">
          {study.title}
        </h3>
        <p className="panel-el panel-summary text-sand-dim mt-5 max-w-xl text-[15px] leading-relaxed">
          {study.summary}
        </p>

        <ul className="panel-features mt-7 space-y-2.5">
          {study.features.map((f) => (
            <li key={f} className="panel-el text-sand-dim flex gap-3 text-sm">
              <span className={`mt-[7px] h-1 w-1 shrink-0 rotate-45 ${study.accent === "mint" ? "bg-mint" : "bg-amber"}`} />
              {f}
            </li>
          ))}
        </ul>

        <div className="panel-el panel-stack mt-7 flex flex-wrap gap-2">
          {study.stack.map((s) => (
            <span
              key={s}
              className="border-line text-muted rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="panel-el panel-actions mt-8 flex flex-wrap gap-3">
          {study.live && (
            <Magnetic strength={0.3}>
              <a
                href={study.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${accentBorder} ${accentText}`}
              >
                Live site ↗
              </a>
            </Magnetic>
          )}
          {study.repo && (
            <Magnetic strength={0.3}>
              <a
                href={study.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="CODE"
                className="border-line text-sand-dim hover:border-sand hover:text-sand inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
              >
                Source ↗
              </a>
            </Magnetic>
          )}
        </div>
      </div>

      <div className="panel-visual w-full lg:w-[54%]">
        <ProjectVisual study={study} />
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current!;
      revealWords(el.querySelector<HTMLElement>(".work-title")!);

      const mm = gsap.matchMedia();

      /* ---------- Desktop / tablet: pinned horizontal scroll ---------- */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const trackEl = track.current!;
        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");

        const getDistance = () => trackEl.scrollWidth - window.innerWidth * 0.86;

        const scrollTween = gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector(".work-pin"),
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(".work-progress-fill", { scaleX: self.progress });
              const i = Math.min(
                caseStudies.length - 1,
                Math.round(self.progress * (caseStudies.length - 1)),
              );
              const counter = el.querySelector(".work-counter");
              if (counter) counter.textContent = caseStudies[i].index;
            },
          },
        });

        // Each panel animates in as it enters, driven by the horizontal tween
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll(".panel-el"), {
            y: 42,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.055,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 78%",
              once: true,
            },
          });
          gsap.from(panel.querySelector(".panel-visual"), {
            scale: 0.9,
            rotate: 1.5,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 80%",
              once: true,
            },
          });
          // subtle depth drift while crossing the viewport
          gsap.to(panel.querySelector(".pv-frame"), {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        });

        return () => scrollTween.kill();
      });

      /* ---------- Mobile / reduced motion: vertical stack ---------- */
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(track.current, { clearProps: "transform" });
        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".panel-el, .panel-visual"), {
            y: 36,
            autoAlpha: 0,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: panel, start: "top 82%", once: true },
          });
        });
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        mm.revert();
      };
    },
    [],
    root,
  );

  return (
    <section ref={root} id="work" className="relative py-24 sm:py-32">
      {/* heading */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="text-mint font-mono text-[11px] tracking-[0.2em]">02</span>
          <span className="label">Selected work</span>
        </div>
        <div className="bg-line mt-3 h-px w-full" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 data-anim className="work-title display text-[clamp(2.1rem,6.5vw,5rem)]">
            Things I&apos;ve built
          </h2>
          <p className="text-muted hidden max-w-xs text-sm md:block">
            Six builds, start to finish. Scroll sideways.
          </p>
        </div>
      </div>

      {/* pinned horizontal region */}
      <div className="work-pin mt-14 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col gap-24 px-5 sm:px-8 md:w-max md:flex-row md:gap-[8vw] md:px-[7vw]"
        >
          {caseStudies.map((s) => (
            <Panel key={s.id} study={s} />
          ))}
        </div>

        {/* progress rail (desktop only) */}
        <div className="work-progress-rail mx-auto hidden w-full max-w-[1400px] px-[7vw] pt-10 md:block">
          <div className="flex items-center gap-5">
            <span className="work-counter text-mint font-mono text-[11px] tracking-[0.2em]">
              01
            </span>
            <span className="bg-line relative h-px flex-1 overflow-hidden">
              <span className="work-progress-fill bg-mint absolute inset-0 origin-left scale-x-0" />
            </span>
            <span className="text-muted font-mono text-[11px] tracking-[0.2em]">
              0{caseStudies.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
