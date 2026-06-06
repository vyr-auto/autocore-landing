import type { MouseEvent } from "react"

export const HEADER_OFFSET = 88

export function scrollToSection(id: string) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "auto" })
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
    return
  }

  const section = document.getElementById(id)
  if (!section) return

  const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" })
  window.history.replaceState(null, "", `#${id}`)
}

export function handleSectionClick(href: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return
    event.preventDefault()
    scrollToSection(href.slice(1))
  }
}
