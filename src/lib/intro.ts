"use client";

/** Resolves when the preloader curtain has cleared, so the hero can time its entrance. */
let release: (() => void) | null = null;

export const introDone: Promise<void> = new Promise<void>((resolve) => {
  release = resolve;
});

export function markIntroDone() {
  release?.();
  release = null;
}
