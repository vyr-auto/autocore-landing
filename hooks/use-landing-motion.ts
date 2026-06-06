"use client"

/** Hover-only helpers. Scroll animations are disabled for reliable native scrolling. */
export function useLandingMotion() {
  return {
    cardHover: { y: -5, scale: 1.01 } as const,
    listHover: { x: 3 } as const,
    tapScale: { scale: 0.995 } as const,
  }
}
