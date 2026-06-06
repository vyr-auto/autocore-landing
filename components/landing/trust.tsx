"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

const trustPoints = [
  "Работаем с реальными бизнес-процессами",
  "Не усложняем без необходимости",
  "Сохраняем привычную логику работы",
  "Проверяем на тестовых данных",
  "Не ломаем текущие файлы без причины",
  "Можно начать с одной задачи",
  "Делаем понятный инструмент",
]

export function Trust() {
  const ref = useRef(null)
  const { inViewAnimate, fadeUpTransition, inViewMargin, cardHover } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section className="premium-section premium-tone-cool">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={inViewAnimate(false)}
          animate={inViewAnimate(isInView)}
          transition={fadeUpTransition()}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-9 lg:mb-12">
            <SectionTitle
              title="Почему решение будет удобно использовать"
              description="Автоматизация сохраняет понятный рабочий сценарий и не превращается в отдельную сложную систему."
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={inViewAnimate(false)}
                animate={inViewAnimate(isInView)}
                transition={fadeUpTransition(0.1 + index * 0.04)}
                className="premium-card flex items-start gap-3 p-4"
                whileHover={cardHover}
              >
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#d4af3726]">
                  <Check className="h-2.5 w-2.5 text-[#d4af37]" />
                </div>
                <span className="text-[14px] leading-[1.55] tracking-[-0.008em] text-[#F5F1E8] text-pretty">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
