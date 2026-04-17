"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: `${new Date().getFullYear() - 2008}+`,
    label: "лет оказываю профессиональную юридическую помощь",
  },
  {
    value: "1000+",
    label: "доверителей",
  },
  {
    value: "50+",
    label: "доверителей на абонентском обслуживании, 7 из которых более 30 лет",
  },
  {
    value: "85%",
    label:
      "доверителей обращаются с новыми вопросами или рекомендуют партнёрам",
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Мои результаты
          </h2>
          <p className="text-primary-foreground/70 text-sm">
            Каждый год это год прогресса и достижений
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
                {stat.value}
              </div>
              <div className="w-8 h-0.5 bg-primary-foreground/40 mb-3" />
              <div className="text-sm text-primary-foreground/80 leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
