"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const advantages = [
  "Адвокатское удостоверение и членство в палате",
  "Практика в судах всех инстанций",
  "Индивидуальный подход к каждому делу",
  "Полная конфиденциальность",
];

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 dark:from-muted dark:to-card flex items-center justify-center">
                <span className="text-8xl">👨‍⚖️</span>
              </div>
            </div>
            {/* Decorative card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl shadow-lg">
              <div className="font-serif text-2xl font-bold">
                {new Date().getFullYear() - 2008}+
              </div>
              <div className="text-xs">лет практики</div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              Об адвокате
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Мордвинцев Роман Фёдорович
            </h2>
            <p className="text-muted-foreground text-lg mb-2 font-medium">
              Адвокат
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Более {new Date().getFullYear() - 2008} лет успешной практики в
              области гражданского, уголовного, арбитражного и административного
              права. Специализируюсь на защите прав граждан и бизнеса в
              правоохранительных органах и судах всех инстанций.
            </p>

            <ul className="space-y-3 mb-8">
              {advantages.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg">
              <Link href="/about">
                Подробнее об адвокате
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
