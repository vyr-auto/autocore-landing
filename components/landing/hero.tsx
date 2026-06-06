"use client"

import { Button } from "@/components/ui/button"
import { handleSectionClick } from "@/lib/scroll"
import {
  ArrowRight,
  FileSpreadsheet,
  Cog,
  FileText,
  Send,
  Database,
  BarChart3,
  FormInput,
  Tag,
  ClipboardList,
} from "lucide-react"

const pipelineSteps = [
  { icon: FileSpreadsheet, label: "Данные", description: "Файлы и таблицы" },
  { icon: FormInput, label: "Excel", description: "Формы и ввод" },
  { icon: ClipboardList, label: "Заявки", description: "Операционные формы" },
  { icon: Tag, label: "Прайсы", description: "Обновление и сверка" },
  { icon: Cog, label: "Логика", description: "Правила обработки" },
  { icon: FileText, label: "Документы", description: "Акты, счета, шаблоны" },
  { icon: BarChart3, label: "Отчёты", description: "Дашборды и KPI" },
  { icon: Database, label: "Системы", description: "CRM и склад" },
  { icon: Send, label: "Telegram", description: "Уведомления и статусы" },
]

const trustIndicators = [
  "Без лишнего ПО и навязанных платформ",
  "На ваших данных и в ваших регламентах",
  "Под ваш процесс, а не шаблон из коробки",
]

export function Hero() {
  return (
    <section className="premium-tone-hero relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-x-clip py-20 lg:min-h-screen lg:py-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_42%_at_50%_-6%,rgba(212,175,55,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_72%,rgba(184,146,46,0.1),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(212,175,55,0.08),transparent_35%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)`,
            backgroundSize: "96px 96px",
          }}
        />
        <div
          aria-hidden
          className="hero-glow-blur absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[#d4af3720] blur-[72px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-[4.5rem] lg:pt-[7.5rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-balance text-[2.08rem] sm:text-[2.86rem] lg:text-[3.75rem] xl:text-[4.24rem] font-semibold leading-[1.03] tracking-[-0.038em]">
            <span className="text-[#F5F1E8]">Автоматизируем рутину, отчёты и данные </span>
            <br className="hidden sm:block" />
            <span className="text-[#F5F1E8]">чтобы </span>
            <span className="gold-gradient-text">бизнес работал быстрее и точнее</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-[15px] sm:text-[17px] lg:text-[19px] font-medium text-[#F5F1E8] leading-[1.68] tracking-[-0.01em]">
            Настраиваем Excel, VBA, Python, документы, прайсы, заявки, уведомления и внутренние
            инструменты под реальные процессы вашей компании.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:mt-9 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="premium-button-text h-12 rounded-xl border border-[#f0d47a57] bg-gradient-to-b from-[#edcb63] via-[#d4af37] to-[#b8922e] px-7 text-[#050505] shadow-[0_8px_18px_rgba(212,175,55,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(212,175,55,0.25)] sm:w-auto"
            >
              <a href="#contact" onClick={handleSectionClick("#contact")}>
                Разобрать задачу
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="premium-button-text h-12 rounded-xl border-[#d4af3740] bg-[rgba(255,255,255,0.01)] px-7 text-[#F5F1E8] transition-all duration-300 hover:border-[#d4af3766] hover:bg-[#d4af3712] sm:w-auto"
            >
              <a href="#examples" onClick={handleSectionClick("#examples")}>Посмотреть примеры</a>
            </Button>
          </div>

          <p className="mt-4 text-[13px] leading-[1.45] tracking-[0.002em] text-[#F5F1E8B8]">
            Можно начать с одного отчёта, прайса или повторяющейся операции
          </p>

          <div className="mt-14 lg:mt-18">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-[3.1rem] left-[5%] right-[5%] h-px -translate-y-1/2 hidden lg:block bg-gradient-to-r from-transparent via-[#d4af3770] to-transparent" />
              <div
                aria-hidden
                className="absolute top-[3.1rem] left-[8%] hidden h-[2px] w-[28%] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#f0d47a] to-transparent blur-[1px] lg:block"
              />
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
                {pipelineSteps.map((step) => (
                  <div key={step.label} className="group">
                    <div className="premium-card relative w-[8.8rem] p-3 sm:w-[9.4rem] sm:p-3.5">
                      <div
                        aria-hidden
                        className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d47a82] to-transparent"
                      />
                      <step.icon className="mx-auto h-4 w-4 text-[#d4af37] sm:h-5 sm:w-5" />
                      <p className="mt-2 text-[11.5px] font-semibold leading-[1.28] tracking-[-0.01em] text-[#F5F1E8]">
                        {step.label}
                      </p>
                      <p className="mt-1 text-[10.5px] leading-[1.42] tracking-[-0.005em] text-[#F5F1E8B3]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 lg:mt-12">
            {trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-2.5">
                <div className="h-1 w-1 rounded-full bg-[#d4af37a8]" />
                <span className="text-[12.5px] sm:text-[13.5px] leading-[1.45] tracking-[-0.005em] text-[#F5F1E8CC]">
                  {indicator}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] via-[#050505d9] to-transparent" />
    </section>
  )
}
