"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Copy, AlertTriangle, Clock, Eye, Layers } from "lucide-react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

const problems = [
  {
    icon: Copy,
    title: "Перенос данных без автоматизации",
    description: "Сотрудники копируют данные между файлами вместо полезной работы.",
  },
  {
    icon: AlertTriangle,
    title: "Ошибки в отчётах",
    description: "Формулы сбиваются, данные расходятся, приходится перепроверять.",
  },
  {
    icon: Clock,
    title: "Повторяющиеся действия",
    description: "Одни и те же операции выполняются ежедневно без автоматизации.",
  },
  {
    icon: Layers,
    title: "Разрозненные файлы",
    description: "Информация в разных местах, контроль зависит от выборочной проверки.",
  },
  {
    icon: Eye,
    title: "Нет прозрачности",
    description: "Сложно понять, что сделано, где ошибка, какой результат актуален.",
  },
]

export function Problems() {
  const ref = useRef(null)
  const { inViewAnimate, fadeUpTransition, inViewMargin, cardHover, tapScale } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section className="premium-section premium-tone-cool">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="Где бизнес теряет время каждый день"
            description="Повторяющиеся операционные задачи тормозят процессы и создают ошибки там, где всё должно работать предсказуемо."
          />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={inViewAnimate(false)}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(index * 0.06)}
              className="group"
              whileHover={cardHover}
              whileTap={tapScale}
            >
              <div className="premium-card p-5 lg:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af3729] bg-[#15120c80]">
                  <problem.icon className="h-4 w-4 text-[#d4af37d4]" />
                </div>
                <h3 className="premium-card-title">{problem.title}</h3>
                <p className="premium-card-text">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
