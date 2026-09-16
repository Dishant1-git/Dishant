"use client";

import { useRef, useState } from "react";
import { gsap, useGsap, prefersReducedMotion } from "@/lib/anim";
import type { ArchiveRepo } from "@/lib/github";
import SectionHeading from "./SectionHeading";

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#5fd9a6",
  JavaScript: "#d9a05b",
  CSS: "#8fa79b",
  HTML: "#cfc7b8",
};

function year(iso: string) {
  return new Date(iso).getFullYear();
}

export default function Archive({ repos }: { repos: ArchiveRepo[] }) {
  const root = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? repos : repos.slice(0, 8);

  useGsap(
    () => {
      const el = root.current!;
      gsap.from(el.querySelectorAll(".ar-row"), {
        y: 30,
        autoAlpha: 0,
        duration: 0.85,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: el.querySelector(".ar-list"), start: "top 86%", once: true },
      });
    },
    [],
    root,
  );

  // Animate newly revealed rows when the list expands
  useGsap(() => {
    if (!expanded || prefersReducedMotion()) return;
    const rows = root.current?.querySelectorAll(".ar-row");
    if (!rows) return;
    gsap.from(Array.from(rows).slice(8), {
      y: 26,
      autoAlpha: 0,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.045,
    });
  }, [expanded]);

  return (
    <section ref={root} id="archive" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="04"
            label="Archive"
            title="Everything else"
            className="flex-1 min-w-[280px]"
          />
        </div>

        <p className="text-muted mt-6 max-w-xl text-sm leading-relaxed">
          Pulled live from GitHub — client sites, experiments and earlier builds.
          {" "}
          <span className="text-sand-dim">{repos.length} repositories.</span>
        </p>

        <div
          className="ar-list mt-14"
          onPointerLeave={() =>
            gsap.to(".ar-row", { opacity: 1, duration: 0.35, overwrite: true })
          }
        >
          <div className="bg-line h-px w-full" />
          {visible.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.homepage || repo.html_url}
              target="_blank"
              rel="noreferrer"
              data-cursor={repo.homepage ? "VISIT" : "CODE"}
              className="ar-row group border-line block border-b"
              onPointerEnter={(e) => {
                if (prefersReducedMotion()) return;
                gsap.to(".ar-row", { opacity: 0.32, duration: 0.4, overwrite: true });
                gsap.to(e.currentTarget, { opacity: 1, duration: 0.4, overwrite: true });
              }}
            >
              <div className="relative grid grid-cols-12 items-center gap-3 py-5 transition-[padding] duration-500 group-hover:pl-3 sm:gap-4 sm:py-6">
                <span
                  className="bg-mint absolute left-0 top-0 h-full w-px origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  aria-hidden
                />

                <span className="text-muted col-span-2 font-mono text-[10px] tracking-[0.16em] sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="col-span-10 text-[17px] leading-tight sm:col-span-4 sm:text-xl">
                  <span className="group-hover:text-mint transition-colors duration-300">
                    {repo.title}
                  </span>
                  {repo.homepage && (
                    <span className="text-mint ml-2 inline-block text-[10px] align-middle opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      LIVE
                    </span>
                  )}
                </h3>

                <p className="text-muted col-span-12 text-sm leading-snug sm:col-span-4 sm:col-start-6">
                  {repo.blurb}
                </p>

                <span className="col-span-6 flex items-center gap-2 sm:col-span-2 sm:justify-end">
                  {repo.language && (
                    <>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: LANG_COLOR[repo.language] ?? "var(--color-muted)" }}
                      />
                      <span className="text-muted font-mono text-[10px] tracking-[0.12em]">
                        {repo.language}
                      </span>
                    </>
                  )}
                </span>

                <span className="text-muted col-span-6 text-right font-mono text-[10px] tracking-[0.12em] sm:col-span-1">
                  {year(repo.pushed_at)}
                  <span className="text-mint ml-2 inline-block translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {repos.length > 8 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            data-cursor={expanded ? "LESS" : "MORE"}
            className="border-line text-sand-dim hover:border-mint hover:text-mint mt-10 rounded-full border px-6 py-3 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors"
          >
            {expanded ? "Show less" : `Show all ${repos.length}`}
          </button>
        )}
      </div>
    </section>
  );
}
