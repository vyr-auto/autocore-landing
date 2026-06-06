"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"
import {
  Tag,
  Package,
  FileText,
  Bell,
  ShoppingCart,
  Calculator,
  FileSpreadsheet,
  Eraser,
  Wrench,
  Upload,
  Search,
  Layers,
} from "lucide-react"

const examples = [
  { icon: Tag, title: "Обновление прайсов" },
  { icon: Layers, title: "Сводные отчёты" },
  { icon: FileText, title: "Акты и счета" },
  { icon: Package, title: "Складской учёт" },
  { icon: Bell, title: "Уведомления в Telegram" },
  { icon: ShoppingCart, title: "Обработка заказов" },
  { icon: Calculator, title: "Расчётные калькуляторы" },
  { icon: FileSpreadsheet, title: "Автоматизация таблиц" },
  { icon: Eraser, title: "Очистка и сверка данных" },
  { icon: Wrench, title: "Инструменты для продаж" },
  { icon: Upload, title: "Подготовка к загрузке в CRM" },
  { icon: Search, title: "Проверка дублей и ошибок" },
]

export function Examples() {
  const ref = useRef(null)
  const { inViewAnimate, fadeUpTransition, inViewMargin, cardHover, tapScale } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section id="examples" className="premium-section premium-tone-cool">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="Примеры задач из реальной работы"
            description="Автоматизация охватывает склад, продажи, отчёты, документы, прайсы, уведомления и внутренние инструменты."
          />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={inViewAnimate(false)}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(index * 0.03)}
              className="group"
              whileHover={cardHover}
              whileTap={tapScale}
            >
              <div className="premium-card p-4 lg:p-5">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af3729] bg-[#15120c80]">
                  <example.icon className="h-3.5 w-3.5 text-[#d4af37]" />
                </div>
                <h3 className="text-[14px] sm:text-[14.5px] font-semibold leading-[1.34] tracking-[-0.016em] text-[#F5F1E8] text-balance">
                  {example.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
