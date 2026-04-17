"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  UserCheck,
  Lock,
  Target,
  Eye,
  MessageCircle,
  Layers,
} from "lucide-react";

const items = [
  {
    icon: UserCheck,
    text: "Индивидуальный подход к каждому делу.",
  },
  {
    icon: Target,
    text: "Чёткая правовая позиция без шаблонов.",
  },
  {
    icon: Lock,
    text: "Конфиденциальность и деликатность.",
  },
  {
    icon: Layers,
    text: "Ориентация на реальный результат.",
  },
  {
    icon: Eye,
    text: "Внимание к деталям и судебной практике.",
  },
  {
    icon: MessageCircle,
    text: "Прозрачная коммуникация на всех этапах.",
  },
];

export function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 bg-muted/30 dark:bg-muted/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-3">
              Доверие клиентов
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 leading-snug">
              Почему мне доверяют
            </h2>

            {/* Decorative quote */}
            <div className="relative pl-6 border-l-2 border-primary/40">
              <span className="absolute -top-3 -left-3 text-6xl text-primary/20 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ко мне обращаются, когда важны не общие слова, а чёткая правовая позиция, внимательность к деталям и уверенное ведение дела. Я подхожу к каждому вопросу индивидуально, без шаблонов и формального отношения.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Клиенты ценят конфиденциальность, профессиональную сдержанность и ориентацию на результат. В работе я всегда исхожу из реальной ситуации, оцениваю риски заранее и предлагаю только те решения, которые действительно могут быть полезны.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Для меня важно не просто сопровождать дело, а выстроить такую правовую защиту, которая будет понятна клиенту, обоснована с точки зрения закона и эффективна на практике.
              </p>
            </div>
          </motion.div>

          {/* Right — items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4 bg-background dark:bg-muted/30 rounded-2xl p-5 shadow-sm border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium leading-snug pt-2">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
