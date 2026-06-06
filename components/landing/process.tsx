"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

const steps = [
  {
    number: "01",
    title: "Диагностика",
    description: "Разбираем, где теряется время и какой результат нужен.",
  },
  {
    number: "02",
    title: "Прототип",
    description: "Собираем первую рабочую логику на тестовых данных.",
  },
  {
    number: "03",
    title: "Проверка",
    description: "Проверяем формулы, сценарии и удобство использования.",
  },
  {
    number: "04",
    title: "Внедрение",
    description: "Передаём готовый инструмент и объясняем, как работать.",
  },
  {
    number: "05",
    title: "Поддержка",
    description: "При необходимости адаптируем под новые задачи.",
  },
]

export function Process() {
  const ref = useRef(null)
  const { shouldReduceMotion, inViewAnimate, fadeUpTransition, inViewMargin } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section id="process" className="premium-section premium-tone-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="Как работаем"
            description="Структурный процесс от диагностики до внедрения: без хаоса, с прозрачными этапами и проверкой результата."
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-[#d4af3766] via-[#d4af3733] to-transparent lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-4 lg:space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={inViewAnimate(false)}
                  animate={inViewAnimate(isInView)}
                  transition={fadeUpTransition(index * 0.08)}
                  className={`relative flex items-start gap-5 lg:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af3766] bg-[#050505] shadow-[0_0_18px_rgba(212,175,55,0.16)]">
                      <span className="text-xs font-semibold text-[#d4af37]">{step.number}</span>
                    </div>
                  </div>

                  <div
                    className={`flex-1 pl-16 lg:pl-0 ${
                      index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    }`}
                  >
                    <div
                      className={`premium-card p-4 lg:p-5 ${
                        index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                      } lg:max-w-sm`}
                    >
                      <motion.div
                        whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                      <h3 className="premium-card-title">{step.title}</h3>
                      <p className="premium-card-text">{step.description}</p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
