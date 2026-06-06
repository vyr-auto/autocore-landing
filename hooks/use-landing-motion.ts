"use client"

import { useReducedMotion } from "framer-motion"
import * as React from "react"

const MOBILE_BREAKPOINT = 768

const visible = { opacity: 1, y: 0, x: 0 }

export function useLandingMotion() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
      : false,
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(mql.matches)
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  const shouldReduceMotion = prefersReducedMotion || isMobile

  const hidden = (y = 24, x = 0) => ({
    opacity: 0,
    y: shouldReduceMotion ? 0 : y,
    x: shouldReduceMotion ? 0 : x,
  })

  const inViewAnimate = (isInView: boolean) =>
    shouldReduceMotion || isInView ? visible : hidden()

  const fadeUpTransition = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay, ease: "easeOut" as const }

  const inViewMargin = shouldReduceMotion ? "0px" : "-80px"

  return {
    isMobile,
    shouldReduceMotion,
    visible,
    hidden,
    inViewAnimate,
    fadeUpTransition,
    inViewMargin,
    cardHover: shouldReduceMotion ? undefined : { y: -5, scale: 1.01 },
    listHover: shouldReduceMotion ? undefined : { x: 3 },
    tapScale: shouldReduceMotion ? undefined : { scale: 0.995 },
  }
}
