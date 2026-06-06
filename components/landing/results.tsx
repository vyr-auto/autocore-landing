"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Shield, Zap, Eye, Users, TrendingUp } from "lucide-react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

const results = [
  {
    icon: Clock,
    title: "Меньше операционной нагрузки",
    description: "Повторяющиеся действия выполняются по заданной логике.",
  },
  {
    icon: Shield,
    title: "Меньше ошибок",
    description: "Проверки и шаблоны работают одинаково каждый раз.",
  },
  {
    icon: Zap,
    title: "Быстрее отчёты",
    description: "Данные собираются и приводятся к виду без лишних действий.",
  },
  {
    icon: Eye,
    title: "Прозрачнее процессы",
    description: "Руководитель видит результат, сотрудники — понятный инструмент.",
  },
  {
    icon: Users,
    title: "Удобнее сотрудникам",
    description: "Инструмент встраивается в процесс без лишней сложности.",
  },
  {
    icon: TrendingUp,
    title: "Можно масштабировать",
    description: "Начать с одного файла, затем расширять автоматизацию.",
  },
]

export function Results() {
  const ref = useRef(null)
  const { inViewAnimate, fadeUpTransition, inViewMargin, cardHover, tapScale } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section className="premium-section premium-tone-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="Что получает бизнес после автоматизации"
            description="Снижение операционной нагрузки, меньше ошибок и больше контроля над данными, документами и отчётностью."
          />
        </div>

        <div className="mx-auto grid max-w-5xl gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {results.map((result, index) => (
            <motion.div
              key={result.title}
              initial={inViewAnimate(false)}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(index * 0.05)}
              className="group"
              whileHover={cardHover}
              whileTap={tapScale}
            >
              <div className="premium-card p-5 lg:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af3729] bg-[#15120c80]">
                  <result.icon className="h-4 w-4 text-[#d4af37]" />
                </div>
                <h3 className="premium-card-title">{result.title}</h3>
                <p className="premium-card-text">{result.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
