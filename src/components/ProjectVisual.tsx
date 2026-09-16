"use client";

import type { CaseStudy } from "@/lib/data";

/** Abstract wireframe standing in for each build — no fake screenshots. */
export default function ProjectVisual({ study }: { study: CaseStudy }) {
  const accent = study.accent === "mint" ? "var(--color-mint)" : "var(--color-amber)";

  return (
    <div className="pv-frame border-line bg-forest-deep/70 relative w-full overflow-hidden rounded-md border">
      {/* window chrome */}
      <div className="border-line flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-line h-2 w-2 rounded-full" />
        <span className="bg-line h-2 w-2 rounded-full" />
        <span className="bg-line h-2 w-2 rounded-full" />
        <span className="border-line text-muted ml-3 flex-1 truncate rounded-full border px-3 py-1 font-mono text-[9px] tracking-wider">
          {study.live ? study.live.replace("https://", "") : `${study.id}.local`}
        </span>
      </div>

      {/* skeleton layout */}
      <div className="relative aspect-[16/10] p-4 sm:p-6">
        <div
          className="pointer-events-none absolute -top-1/4 left-1/2 h-[120%] w-[70%] -translate-x-1/2 opacity-40 blur-2xl"
          style={{ background: `radial-gradient(circle, ${accent}55, transparent 65%)` }}
        />

        <div className="relative flex h-full gap-4">
          {/* sidebar */}
          <div className="hidden w-[18%] flex-col gap-2 sm:flex">
            <div className="rounded-sm" style={{ height: 8, width: "70%", background: accent, opacity: 0.9 }} />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-line rounded-sm"
                style={{ height: 6, width: `${88 - i * 9}%` }}
              />
            ))}
            <div className="mt-auto rounded-sm border" style={{ height: 22, borderColor: accent, opacity: 0.5 }} />
          </div>

          {/* main */}
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border-line bg-surface/60 flex-1 rounded-sm border p-2"
                >
                  <div className="bg-line mb-1.5 rounded-sm" style={{ height: 4, width: "45%" }} />
                  <div
                    className="rounded-sm"
                    style={{ height: 9, width: `${52 + i * 13}%`, background: accent, opacity: 0.75 }}
                  />
                </div>
              ))}
            </div>

            <div className="border-line bg-surface/40 flex-1 rounded-sm border p-3">
              <div className="mb-3 flex items-end gap-1.5" style={{ height: "46%" }}>
                {[38, 62, 45, 78, 55, 88, 68, 94, 72].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background: i % 3 === 2 ? accent : "var(--color-line)",
                      opacity: i % 3 === 2 ? 0.85 : 1,
                    }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {[100, 82, 91].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-line h-3.5 w-3.5 shrink-0 rounded-full" />
                    <div className="bg-line rounded-sm" style={{ height: 5, width: `${w * 0.5}%` }} />
                    <div
                      className="ml-auto rounded-full"
                      style={{ height: 5, width: 26, background: accent, opacity: 0.6 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* index watermark */}
      <span
        className="display pointer-events-none absolute -right-2 -bottom-6 text-[7rem] leading-none opacity-[0.07] sm:text-[10rem]"
        style={{ color: accent }}
        aria-hidden
      >
        {study.index}
      </span>
    </div>
  );
}
