"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Анализ ситуации и документов",
    text: "Работа над делом начинается с внимательного изучения вашей ситуации, документов и целей, которых необходимо достичь.",
  },
  {
    num: "02",
    title: "Оценка рисков и перспектив",
    text: "После первичного анализа оцениваю правовые риски, возможные сценарии и перспективы дела — честно и без лишнего оптимизма.",
  },
  {
    num: "03",
    title: "Выбор стратегии защиты",
    text: "Формируется стратегия: досудебное урегулирование, подготовка претензии, представительство в суде или комплексное сопровождение.",
  },
  {
    num: "04",
    title: "Подготовка документов",
    text: "Составляю исковые заявления, ходатайства, возражения, жалобы и иные процессуальные документы с учётом позиции и тактики.",
  },
  {
    num: "05",
    title: "Досудебное урегулирование или суд",
    text: "Каждый этап выстраивается последовательно. При возможности — решаем вопрос без суда. Если нужно — иду до конца.",
  },
  {
    num: "06",
    title: "Сопровождение до результата",
    text: "Вы всегда понимаете, на какой стадии находится дело и что предпринимается. Контроль и коммуникация — на каждом шаге.",
  },
];

export function HowIWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Процесс работы
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Как я работаю
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Работа над делом начинается с внимательного изучения вашей ситуации, документов и целей, которых необходимо достичь. После первичного анализа я оцениваю правовые риски, возможные сценарии и перспективы дела.
            </p>
            <p>
              В процессе работы я сохраняю понятную коммуникацию, чтобы вы всегда понимали, на какой стадии находится дело, какие действия предпринимаются и к чему они ведут.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-muted/40 dark:bg-muted/20 border border-border rounded-2xl p-6 hover:border-primary/40 hover:bg-muted/60 transition-all duration-200">
                {/* Number */}
                <div className="mb-5 flex items-end gap-3">
                  <span className="font-serif text-5xl font-bold text-primary/15 dark:text-primary/20 leading-none select-none group-hover:text-primary/25 transition-colors">
                    {step.num}
                  </span>
                  <div className="h-px flex-1 bg-border mb-3" />
                </div>

                <h3 className="font-serif text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
