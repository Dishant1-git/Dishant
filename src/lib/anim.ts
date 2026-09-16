"use client";

import { useLayoutEffect, useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Scoped GSAP effect — every tween/ScrollTrigger created inside is reverted on cleanup. */
export function useGsap(
  fn: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: RefObject<HTMLElement | null>,
) {
  useIsoLayoutEffect(() => {
    const ctx = gsap.context((self) => fn(self), scope?.current ?? undefined);
    return () => ctx.revert();
  }, deps);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Wraps each word of an element in mask/inner spans so words can rise into view.
 * Returns the animatable `.word-inner` elements. Idempotent per element.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
  }

  const walk = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return [node.cloneNode()];
      const frag: Node[] = [];
      // keep whitespace so wrapping behaves normally
      text.split(/(\s+)/).forEach((chunk) => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
          frag.push(document.createTextNode(chunk));
          return;
        }
        const mask = document.createElement("span");
        mask.className = "word-mask";
        const inner = document.createElement("span");
        inner.className = "word-inner";
        inner.textContent = chunk;
        mask.appendChild(inner);
        frag.push(mask);
      });
      return frag;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const src = node as HTMLElement;
      const clone = src.cloneNode(false) as HTMLElement;
      Array.from(src.childNodes).forEach((child) =>
        walk(child).forEach((n) => clone.appendChild(n)),
      );
      return [clone];
    }

    return [node.cloneNode(true)];
  };

  const children = Array.from(el.childNodes);
  el.replaceChildren(...children.flatMap(walk));
  el.dataset.split = "done";
  return Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));
}

/** Wraps each character in a span. Used for the scramble/stagger headline effect. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitChars === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>(".char"));
  }
  const text = el.textContent ?? "";
  el.replaceChildren(
    ...text.split("").map((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      span.textContent = ch === " " ? " " : ch;
      return span;
    }),
  );
  el.dataset.splitChars = "done";
  return Array.from(el.querySelectorAll<HTMLElement>(".char"));
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#$%&@";

/** Character-scramble decode. Resolves left-to-right over `duration` seconds. */
export function scramble(el: HTMLElement, finalText: string, duration = 1.2) {
  const chars = finalText.split("");
  const total = Math.round(duration * 60);
  let frame = 0;

  const tick = () => {
    const progress = frame / total;
    el.textContent = chars
      .map((ch, i) => {
        if (ch === " ") return " ";
        const revealAt = i / chars.length;
        if (progress >= revealAt + 0.25) return ch;
        if (progress < revealAt - 0.1) return "";
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join("");
    frame += 1;
    if (frame > total) {
      el.textContent = finalText;
      gsap.ticker.remove(tick);
    }
  };

  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/** Standard reveal: masked words rise, with an optional stagger origin. */
export function revealWords(
  el: HTMLElement,
  vars: gsap.TweenVars = {},
  triggerVars: ScrollTrigger.Vars = {},
) {
  const words = splitWords(el);
  el.classList.add("anim-ready");
  return gsap.from(words, {
    yPercent: 118,
    rotate: 3,
    duration: 1.15,
    ease: "expo.out",
    stagger: 0.045,
    scrollTrigger: { trigger: el, start: "top 88%", once: true, ...triggerVars },
    ...vars,
  });
}

/** Generic fade + rise for blocks, cards, rows. */
export function revealUp(
  targets: gsap.TweenTarget,
  trigger: Element,
  vars: gsap.TweenVars = {},
) {
  return gsap.from(targets, {
    y: 46,
    autoAlpha: 0,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.09,
    scrollTrigger: { trigger, start: "top 85%", once: true },
    ...vars,
  });
}
