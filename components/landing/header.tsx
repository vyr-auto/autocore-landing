"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { handleSectionClick } from "@/lib/scroll"

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Примеры", href: "#examples" },
  { label: "Процесс", href: "#process" },
  { label: "Результат", href: "#result" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 20
      setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/92 border-b border-[#d4af3724] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.6rem]">
          <a href="#top" onClick={handleSectionClick("#top")} className="flex items-center gap-2 group">
            <span className="text-[0.86rem] sm:text-[0.9rem] lg:text-[1.02rem] font-semibold tracking-[0.06em] uppercase text-[#F5F1E8D9] transition-opacity duration-300 group-hover:opacity-90">
              Автоматизация в дело
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleSectionClick(item.href)}
                className="premium-nav-text relative text-[#F5F1E8CC] hover:text-[#F5F1E8] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#d4af37] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              size="sm"
              className="premium-nav-text h-10 rounded-xl border border-[#f0d47a4d] bg-gradient-to-b from-[#ebc95e] via-[#d4af37] to-[#b8922e] text-[#050505] px-5 font-semibold shadow-[0_8px_22px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(212,175,55,0.28)]"
            >
              <a href="#contact" onClick={handleSectionClick("#contact")}>Обсудить задачу</a>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-lg border border-[#d4af3724] bg-[#050505]/70 p-2 text-[#F5F1E8]"
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-b border-[#d4af3724] bg-[#050505]/95 transition-[max-height,opacity] duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-5 flex flex-col gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                handleSectionClick(item.href)(event)
                setIsMobileMenuOpen(false)
              }}
              className="text-[16px] leading-[1.35] tracking-[-0.01em] text-[#F5F1E8CC] hover:text-[#F5F1E8] transition-colors py-3 px-3 rounded-lg hover:bg-[#d4af370f]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-[#d4af3726]">
            <Button
              asChild
              className="w-full h-11 rounded-xl border border-[#f0d47a4d] bg-gradient-to-b from-[#ebc95e] via-[#d4af37] to-[#b8922e] text-[#050505] font-semibold"
            >
              <a
                href="#contact"
                onClick={(event) => {
                  handleSectionClick("#contact")(event)
                  setIsMobileMenuOpen(false)
                }}
              >
                Обсудить задачу
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
