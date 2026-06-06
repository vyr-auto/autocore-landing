"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check, Copy, AlertCircle, RefreshCw, Zap, FileCheck, Sparkles, Clock, Settings } from "lucide-react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"

const beforeItems = [
  { icon: Copy, text: "Копирование данных без автоматизации" },
  { icon: AlertCircle, text: "Хаос в файлах" },
  { icon: Clock, text: "Ошибки в формулах" },
  { icon: RefreshCw, text: "Постоянные проверки" },
  { icon: Settings, text: "Много повторяющихся действий" },
]

const afterItems = [
  { icon: Zap, text: "Данные обрабатываются по логике" },
  { icon: FileCheck, text: "Отчёты собираются быстрее" },
  { icon: Sparkles, text: "Документы из шаблонов" },
  { icon: Check, text: "Меньше ошибок" },
  { icon: RefreshCw, text: "Результат повторяется стабильно" },
]

export function BeforeAfter() {
  const ref = useRef(null)
  const { shouldReduceMotion, inViewAnimate, fadeUpTransition, inViewMargin, listHover } =
    useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section id="result" className="premium-section premium-tone-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="До и после автоматизации"
            description="Переход от несистемной рутины к предсказуемому процессу с понятной логикой и стабильным результатом."
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <motion.div
              initial={shouldReduceMotion ? inViewAnimate(true) : { opacity: 0, x: -24 }}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(0.1)}
            >
              <div className="premium-card border-[#6b3a1a40] p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6b3a1a40]">
                    <X className="h-3.5 w-3.5 text-[#a05a2f]" />
                  </div>
                  <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#F5F1E8]">Процесс без автоматизации</h3>
                </div>
                <div className="space-y-2">
                  {beforeItems.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={inViewAnimate(false)}
                      animate={inViewAnimate(isInView)}
                      transition={fadeUpTransition(0.2 + index * 0.05)}
                      className="flex items-center gap-2.5 rounded-lg border border-[#6b3a1a2e] bg-[#6b3a1a17] p-2.5"
                      whileHover={listHover}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0 text-[#a56a43]" />
                      <span className="text-[14px] leading-[1.45] tracking-[-0.005em] text-[#F5F1E8CC]">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? inViewAnimate(true) : { opacity: 0, x: 24 }}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(0.2)}
            >
              <div className="premium-card p-5 lg:p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af3726]">
                    <Check className="h-3.5 w-3.5 text-[#d4af37]" />
                  </div>
                  <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#F5F1E8]">
                    Автоматизированный процесс
                  </h3>
                </div>
                <div className="space-y-2">
                  {afterItems.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={inViewAnimate(false)}
                      animate={inViewAnimate(isInView)}
                      transition={fadeUpTransition(0.3 + index * 0.05)}
                      className="flex items-center gap-2.5 rounded-lg border border-[#d4af3736] bg-[#d4af3712] p-2.5"
                      whileHover={listHover}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                      <span className="text-[14px] leading-[1.45] tracking-[-0.005em] text-[#F5F1E8]">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
