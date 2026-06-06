"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "@/components/landing/section-title"
import { useLandingMotion } from "@/hooks/use-landing-motion"
import {
  FileSpreadsheet,
  BarChart3,
  FileStack,
  Package,
  FileText,
  Code2,
  Bell,
  Calculator,
  Plug,
  Eraser,
} from "lucide-react"

const services = [
  {
    icon: FileSpreadsheet,
    title: "Excel и VBA",
    description: "Макросы, кнопки, проверки, формы и автозаполнение таблиц.",
  },
  {
    icon: BarChart3,
    title: "Отчёты",
    description: "Сводные отчёты, дашборды и управленческие таблицы.",
  },
  {
    icon: FileText,
    title: "Документы",
    description: "Акты, счета, шаблоны и договоры из ваших данных.",
  },
  {
    icon: FileStack,
    title: "Прайсы и файлы",
    description: "Очистка, сверка и подготовка к загрузке или отправке.",
  },
  {
    icon: Code2,
    title: "Python",
    description: "Скрипты для обработки данных, расчётов и интеграций.",
  },
  {
    icon: Bell,
    title: "Telegram",
    description: "Заявки, статусы, напоминания и отчёты в мессенджер.",
  },
  {
    icon: Calculator,
    title: "Инструменты",
    description: "Калькуляторы, формы и панели для сотрудников.",
  },
  {
    icon: Plug,
    title: "Интеграции",
    description: "Связка таблиц, CRM, складских систем и сервисов.",
  },
  {
    icon: Package,
    title: "Склад",
    description: "Движение товаров, остатки, заявки и отгрузки.",
  },
  {
    icon: Eraser,
    title: "Очистка данных",
    description: "Удаление ошибок, дублей и приведение к формату.",
  },
]

export function Services() {
  const ref = useRef(null)
  const { inViewAnimate, fadeUpTransition, inViewMargin, cardHover, tapScale } = useLandingMotion()
  const isInView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <section id="services" className="premium-section premium-tone-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-11 lg:mb-14">
          <SectionTitle
            title="Что можно автоматизировать"
            description="От Excel и VBA до Python-скриптов, документов, отчётности и операционных связок между отделами."
          />
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={inViewAnimate(false)}
              animate={inViewAnimate(isInView)}
              transition={fadeUpTransition(index * 0.035)}
              className="group"
              whileHover={cardHover}
              whileTap={tapScale}
            >
              <div className="premium-card p-5 lg:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af3729] bg-[#15120c80]">
                  <service.icon className="h-4 w-4 text-[#d4af37]" />
                </div>
                <h3 className="premium-card-title">{service.title}</h3>
                <p className="premium-card-text">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
