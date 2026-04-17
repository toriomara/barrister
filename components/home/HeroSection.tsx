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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:from-background dark:via-background dark:to-muted" />
      <div className="absolute inset-0 bg-[url('/images/law-bg.jpg')] bg-cover bg-center opacity-10 dark:opacity-5" />

      {/* Photo - absolute, behind text */}
      <motion.div
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="absolute right-0 bottom-0 h-full z-[1] hidden lg:block pointer-events-none select-none -translate-x-24"
      >
        <Image
          src="/advokatTransparent.png"
          alt="Адвокат"
          width={900}
          height={1200}
          className="object-contain h-full w-auto drop-shadow-2xl"
          priority
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* Text column */}
          <div>
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

          {/* Empty right column for spacing */}
          <div className="hidden lg:block" />
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
