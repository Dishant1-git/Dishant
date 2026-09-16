"use client";

import { useRef, useState } from "react";
import { gsap, useGsap, ScrollTrigger } from "@/lib/anim";
import { introDone } from "@/lib/intro";
import { profile } from "@/lib/data";
import Magnetic from "./Magnetic";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#archive", label: "Archive" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGsap(() => {
    const el = bar.current!;
    gsap.set(el, { yPercent: -110, autoAlpha: 0 });

    introDone.then(() => {
      gsap.to(el, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", delay: 0.15 });
    });

    // Hide on scroll down, reveal on scroll up
    ScrollTrigger.create({
      start: "top -120",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 220) {
          gsap.to(el, { yPercent: -110, duration: 0.5, ease: "power3.inOut" });
        } else {
          gsap.to(el, { yPercent: 0, duration: 0.5, ease: "power3.out" });
        }
      },
      onToggle: (self) => {
        gsap.to(".nav-shell", {
          backgroundColor: self.isActive ? "rgba(7,20,17,0.72)" : "rgba(7,20,17,0)",
          borderColor: self.isActive ? "var(--color-line)" : "transparent",
          duration: 0.45,
        });
      },
    });
  }, []);

  useGsap(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      gsap
        .timeline()
        .set(el, { display: "flex" })
        .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" })
        .from(".menu-item", { yPercent: 120, duration: 0.7, ease: "expo.out", stagger: 0.06 }, "-=0.35");
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <>
      <header ref={bar} className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:px-6">
        <div className="nav-shell mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-transparent px-5 py-3 backdrop-blur-xl sm:px-7">
          <a href="#top" className="group flex items-center gap-3" data-cursor="TOP">
            <span className="bg-mint h-2 w-2 shrink-0 rounded-full" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
              {profile.first}
              <span className="text-muted">.{profile.last}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-wipe text-sand-dim hover:text-sand font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="border-line hidden items-center gap-2 rounded-full border px-3 py-1.5 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-mint absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                <span className="bg-mint relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                Open to work
              </span>
            </span>

            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="SAY HI"
                className="border-mint text-mint hover:bg-mint hover:text-forest-deep hidden rounded-full border px-5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 sm:inline-block"
              >
                Hire me
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="border-line flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border md:hidden"
            >
              <span
                className={`bg-sand block h-px w-4 transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`bg-sand block h-px w-4 transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        style={{ display: "none" }}
        className="bg-forest-deep fixed inset-0 z-40 hidden flex-col justify-center px-8 md:!hidden"
      >
        <nav className="flex flex-col gap-2">
          {links.map((l, i) => (
            <span key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-item display text-sand hover:text-mint block py-1 text-[13vw] transition-colors"
              >
                <span className="text-muted mr-4 font-mono text-[10px] align-super">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            </span>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="text-mint mt-12 font-mono text-xs tracking-[0.14em]"
        >
          {profile.email}
        </a>
      </div>
    </>
  );
}
