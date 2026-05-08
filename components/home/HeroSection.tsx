"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:from-background dark:via-background dark:to-muted" />
      <div className="absolute inset-0 bg-[url('/images/law-bg.jpg')] bg-cover bg-center opacity-10 dark:opacity-5" />

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Text column */}
          <div className="min-w-0">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full">
                <Shield className="w-3.5 h-3.5 text-primary-foreground/80 dark:text-primary" />
                <span className="text-xs font-medium text-primary-foreground/80 dark:text-primary">
                  {new Date().getFullYear() - 2008}+ лет успешной практики
                </span>
              </div>
            </motion.div>

            <motion.h1
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-foreground leading-tight mb-6"
            >
              <div className="lg:text-6xl pb-5">
                Мордвинцев <br />
                Роман Фёдорович <br />
              </div>
              <span className="text-primary-foreground/80 dark:text-primary">
                Ваш надёжный защитник
                <br />в мире права
              </span>
            </motion.h1>

            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 dark:text-muted-foreground mb-8 leading-relaxed"
            >
              Профессиональная юридическая помощь по уголовным, гражданским и
              административным делам. Защищаю ваши интересы в судах всех
              инстанций.
            </motion.p>

            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="xl" variant="gold">
                <Link href="/contacts">
                  Записаться на консультацию
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-border dark:text-foreground dark:hover:bg-muted"
              >
                <a href="tel:+79608670139">
                  <Phone className="mr-2 w-4 h-4" />
                  +7 (960) 867-01-39
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile about info */}
          <div className="lg:hidden order-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 dark:text-muted-foreground mb-3">
              Об адвокате
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-xs text-white/50 dark:text-muted-foreground mb-0.5">Статус</p>
                <p className="text-sm text-white/90 dark:text-foreground">
                  Адвокат, филиал № 10 Волгоградской межрайонной коллегии адвокатов
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50 dark:text-muted-foreground mb-0.5">Образование</p>
                <p className="text-sm text-white/90 dark:text-foreground">
                  Высшее юридическое (2004). Магистратура юрфака ВолГУ (2013)
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50 dark:text-muted-foreground mb-0.5">Профессиональный путь</p>
                <p className="text-sm text-white/90 dark:text-foreground">
                  С 2008 года в Филиале № 10 Волгоградской межрайонной коллегии адвокатов
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50 dark:text-muted-foreground mb-0.5">Достижения</p>
                <p className="text-sm text-white/90 dark:text-foreground">
                  Грамота АП Волгоградской области (2014), почётная грамота коллегии адвокатов (2023)
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-white/50 dark:text-muted-foreground mb-0.5">Специализация</p>
                <p className="text-sm text-white/90 dark:text-foreground">
                  Защита по уголовным делам любой сложности и категории. Участие в качестве защитника на всех стадиях: доследственная проверка, предварительное расследование, суд первой инстанции.
                </p>
              </div>
            </div>
          </div>

          {/* Photo column */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative flex justify-center lg:justify-end"
          >
            <Image
              src="/advokatTransparent.png"
              alt="Адвокат"
              width={1400}
              height={1800}
              priority
              className="object-contain w-auto h-[35vh] md:h-[45vh] lg:h-[85vh] max-w-none drop-shadow-2xl pointer-events-none select-none -z-10"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40L60 46.7C120 53.3 240 66.7 360 66.7C480 66.7 600 53.3 720 46.7C840 40 960 40 1080 43.3C1200 46.7 1320 53.3 1380 56.7L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
