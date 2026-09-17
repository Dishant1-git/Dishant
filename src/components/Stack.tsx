"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/anim";
import { stack } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current!;

      el.querySelectorAll<HTMLElement>(".stack-col").forEach((col, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: col, start: "top 88%", once: true } })
          .from(col.querySelector(".stack-rule"), {
            scaleX: 0,
            duration: 1,
            ease: "expo.inOut",
            delay: i * 0.06,
          })
          .from(
            col.querySelectorAll(".stack-item"),
            { y: 22, autoAlpha: 0, duration: 0.7, ease: "expo.out", stagger: 0.05 },
            "-=0.7",
          );
      });

      // Counter-rotating orbit marks behind the grid
      gsap.to(el.querySelector(".stack-orbit-a"), {
        rotate: 90,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(el.querySelector(".stack-orbit-b"), {
        rotate: -120,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.6 },
      });
    },
    [],
    root,
  );

  return (
    <section ref={root} id="stack" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div
        className="stack-orbit-a border-line pointer-events-none absolute -left-[15%] top-[12%] -z-10 h-[42vw] w-[42vw] rounded-full border opacity-40"
        aria-hidden
      />
      <div
        className="stack-orbit-b border-line pointer-events-none absolute -right-[18%] bottom-[8%] -z-10 h-[34vw] w-[34vw] rotate-45 border opacity-30"
        aria-hidden
      />

      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="03" label="Capabilities" title="The toolkit" />

        {/* Six groups: two clean rows of three from lg up, pairs below that. */}
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group) => (
            <div key={group.group} className="stack-col">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-sand">
                  {group.group}
                </h3>
                <span className="text-muted font-mono text-[10px]">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="stack-rule bg-line mt-3 h-px w-full origin-left" />
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="stack-item group text-sand-dim hover:text-sand flex cursor-default items-center gap-3 text-[15px] transition-colors"
                  >
                    <span className="bg-line group-hover:bg-mint h-px w-4 shrink-0 transition-all duration-300 group-hover:w-7" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="stack-col mt-20 md:mt-24">
          <div className="stack-rule bg-line mb-8 h-px w-full origin-left" />
          <div className="grid gap-6 md:grid-cols-12">
            <p className="stack-item label md:col-span-3">Currently learning</p>
            <p className="stack-item text-sand-dim md:col-span-9 text-[15px] leading-relaxed sm:text-lg">
              Deeper TypeScript, testing discipline, and the parts of system design that
              decide whether an app survives its second year — caching, queues and
              sensible database indexes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
