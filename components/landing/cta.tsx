"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Send } from "lucide-react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

export function CTA() {
  const ref = useRef(null)
  const { shouldReduceMotion, inViewAnimate, fadeUpTransition, inViewMargin, tapScale } =
    useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section id="contact" className="premium-section premium-tone-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={inViewAnimate(false)}
          animate={inViewAnimate(isInView)}
          transition={fadeUpTransition()}
          className="max-w-3xl mx-auto"
        >
          <div className="premium-card relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="cta-glow-blur absolute right-0 top-0 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af371c] blur-xl" />
            <div className="cta-glow-blur absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#b8922e1c] blur-xl" />

            <div className="relative z-10 text-center">
              <SectionTitle
                title="Опишите задачу — покажем, как её автоматизировать"
                description="Пришлите пример файла или описание процесса. Оценим, где убрать повторяющиеся действия и как получить стабильный результат."
                className="mx-auto max-w-2xl"
              />

              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={tapScale}>
                  <Button
                    asChild
                    size="lg"
                    className="premium-button-text h-12 rounded-xl border border-[#f0d47a57] bg-gradient-to-b from-[#edcb63] via-[#d4af37] to-[#b8922e] px-6 text-[#050505] shadow-[0_8px_18px_rgba(212,175,55,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(212,175,55,0.25)] sm:w-auto"
                  >
                    <a href="tel:+79257858817">
                      Позвонить
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }} whileTap={tapScale}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="premium-button-text h-12 rounded-xl border-[#d4af3740] bg-[rgba(255,255,255,0.01)] px-6 text-[#F5F1E8] transition-all duration-300 hover:border-[#d4af3766] hover:bg-[#d4af3712] sm:w-auto"
                  >
                    <a href="https://t.me/VYA555" target="_blank" rel="noopener noreferrer">
                      <Send className="mr-2 h-4 w-4" />
                      Написать в Telegram
                    </a>
                  </Button>
                </motion.div>
              </div>

              <p className="mt-4 text-[13px] leading-[1.45] tracking-[-0.004em] text-[#F5F1E8BF]">
                Можно начать без технического задания — опишите, что сейчас делается без автоматизации.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
