import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности сайта Автоматизация в дело.",
}

export default function PrivacyPage() {
  return (
    <main className="premium-bg-system min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-[13px] text-[#F5F1E8B3] transition-colors duration-300 hover:text-[#F5F1E8]"
        >
          Назад на сайт
        </Link>

        <article className="premium-card mt-4 rounded-2xl p-6 sm:p-8 lg:p-10">
          <h1 className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#F5F1E8] sm:text-[2rem]">
            Политика конфиденциальности
          </h1>

          <div className="mt-6 space-y-5 text-[14px] leading-[1.65] tracking-[-0.006em] text-[#F5F1E8CC]">
            <p>
              Настоящая политика определяет порядок обработки информации на сайте
              «Автоматизация в дело».
            </p>

            <section className="space-y-2">
              <h2 className="text-[15px] font-semibold text-[#F5F1E8]">1. Какие данные обрабатываются</h2>
              <p>
                Сайт не использует формы регистрации, личные кабинеты и иные механизмы
                автоматического сбора персональных данных пользователей.
              </p>
              <p>
                Обращение через телефон, электронную почту или Telegram происходит по инициативе
                пользователя и через соответствующие внешние сервисы.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-[15px] font-semibold text-[#F5F1E8]">2. Аналитика и cookies</h2>
              <p>
                На сайте не подключены внешние системы веб-аналитики для отслеживания поведения
                посетителей.
              </p>
              <p>
                Технические файлы cookies, необходимые для базовой работы браузера, могут
                использоваться самим браузером пользователя.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-[15px] font-semibold text-[#F5F1E8]">3. Ссылки на внешние сервисы</h2>
              <p>
                Сайт содержит ссылки на сторонние ресурсы (Telegram, почтовые сервисы). Их работа
                регулируется правилами и политиками соответствующих сервисов.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-[15px] font-semibold text-[#F5F1E8]">4. Контакты</h2>
              <p>
                По вопросам, связанным с обработкой информации, можно обратиться по адресу:{" "}
                <a
                  href="mailto:gorcovd@gmail.com"
                  className="text-[#F5F1E8] underline decoration-[#d4af37a3] underline-offset-2"
                >
                  gorcovd@gmail.com
                </a>
                .
              </p>
            </section>

            <p className="text-[12px] text-[#F5F1E899]">
              Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
