"use client";

import { useRef } from "react";
import { gsap, useGsap, revealWords, revealUp } from "@/lib/anim";
import { profile, approach } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import CartoonStatic from "./Cartoon";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current!;

      revealWords(el.querySelector<HTMLElement>(".about-statement")!, { stagger: 0.03 });
      revealUp(el.querySelectorAll(".about-para"), el.querySelector(".about-copy")!);

      // Portrait reveals with a clip wipe, then drifts on scroll
      gsap.from(el.querySelector(".about-portrait"), {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: el.querySelector(".about-portrait"), start: "top 88%", once: true },
      });
      gsap.to(el.querySelector(".about-portrait .grid-lines"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: el.querySelector(".about-portrait"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Approach rows: line draws, content rises
      el.querySelectorAll<HTMLElement>(".ap-row").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 86%", once: true } })
          .from(row.querySelector(".ap-line"), { scaleX: 0, duration: 1.1, ease: "expo.inOut" })
          .from(
            row.querySelectorAll(".ap-fade"),
            { y: 30, autoAlpha: 0, duration: 0.95, ease: "expo.out", stagger: 0.07 },
            "-=0.75",
          );
      });
    },
    [],
    root,
  );

  return (
    <section ref={root} id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading index="01" label="About" title="Who's behind the commits" />

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Portrait */}
          <div className="md:col-span-4">
            <div className="about-portrait border-line bg-surface relative aspect-[4/5] rounded-sm border">
              <div className="grid-lines absolute inset-0 opacity-50" />
              <div className="glow-mint absolute inset-x-0 bottom-0 h-3/4 opacity-70" />
              <div className="border-line/60 absolute inset-3 border" />

              {/* Landing spot for the mascot flying down from the hero. */}
              <div
                id="cartoon-about-slot"
                aria-hidden
                className="absolute top-[41%] left-1/2 aspect-[584/1653] w-[32%] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="cartoon-static h-full w-full">
                  <CartoonStatic className="h-full w-full" />
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="text-sand font-mono text-[9px] tracking-[0.2em] uppercase">
                    ID / 001
                  </span>
                  <span className="border-mint/70 bg-forest-deep/80 text-mint rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] uppercase backdrop-blur-sm">
                    Available
                  </span>
                </div>

                <div>
                  <span className="display text-sand block text-2xl leading-tight">
                    {profile.name}
                  </span>
                  <div className="border-line/70 mt-3 flex items-center justify-between border-t pt-3">
                    <span className="font-mono text-[9px] tracking-[0.16em] text-sand-dim uppercase">
                      MERN Stack
                    </span>
                    <span className="text-mint font-mono text-[9px] tracking-[0.16em] uppercase">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="about-copy md:col-span-7 md:col-start-6">
            <p
              data-anim
              className="about-statement display text-[clamp(1.5rem,3.3vw,2.6rem)] leading-[1.15]"
            >
              I turn ideas into <span className="text-mint">working products</span> — schema
              to interface, first commit to live URL.
            </p>

            <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-sand-dim sm:text-base">
              <p className="about-para">
                I&apos;m a full-stack developer working primarily in the MERN stack. Most of what
                I build is the whole thing: the MongoDB schema, the Express API and its auth
                layer, the React front end, and the deployment that puts it in front of people.
              </p>
              <p className="about-para">
                Over the last two years that has meant e-commerce platforms with admin
                dashboards, an alumni network, a job marketplace, a CRM, and a set of
                production marketing sites in Next.js and TypeScript — twenty-plus repositories,
                eight of them live.
              </p>
              <p className="about-para">
                I&apos;m looking for full-time work, freelance projects, and people worth
                building with.
              </p>
            </div>

            <div className="about-para mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="EMAIL"
                className="link-wipe text-mint font-mono text-xs tracking-[0.1em]"
              >
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-wipe text-sand-dim font-mono text-xs tracking-[0.1em]"
              >
                github.com/{profile.githubHandle} ↗
              </a>
            </div>
          </div>
        </div>

        {/* How I work */}
        <div className="mt-24 sm:mt-32">
          <p className="label mb-8">How I work</p>
          <div>
            {approach.map((a) => (
              <div key={a.n} className="ap-row">
                <div className="ap-line bg-line h-px w-full origin-left" />
                <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-10">
                  <span className="ap-fade text-mint font-mono text-[11px] tracking-[0.2em] md:col-span-1">
                    {a.n}
                  </span>
                  <h3 className="ap-fade display text-2xl sm:text-3xl md:col-span-4">
                    {a.title}
                  </h3>
                  <p className="ap-fade text-sand-dim text-[15px] leading-relaxed md:col-span-6 md:col-start-7">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-line h-px w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
