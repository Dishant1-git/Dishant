"use client";

import { useRef } from "react";
import { gsap, useGsap, revealWords } from "@/lib/anim";

type Props = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

export default function SectionHeading({ index, label, title, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current!;
      revealWords(el.querySelector<HTMLElement>(".sh-title")!);
      gsap.from(el.querySelectorAll(".sh-meta"), {
        autoAlpha: 0,
        x: -18,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
      gsap.from(el.querySelector(".sh-rule"), {
        scaleX: 0,
        duration: 1.3,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    [],
    root,
  );

  return (
    <div ref={root} className={className}>
      <div className="flex items-baseline gap-4">
        <span className="sh-meta text-mint font-mono text-[11px] tracking-[0.2em]">
          {index}
        </span>
        <span className="sh-meta label">{label}</span>
      </div>
      <div className="sh-rule bg-line mt-3 h-px w-full origin-left" />
      <h2
        data-anim
        className="sh-title display mt-6 text-[clamp(2.1rem,6.5vw,5rem)]"
      >
        {title}
      </h2>
    </div>
  );
}
