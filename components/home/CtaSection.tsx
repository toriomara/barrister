"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-primary dark:bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white dark:text-foreground mb-4">
            Нужна юридическая помощь?
          </h2>
          <p className="text-white/80 dark:text-muted-foreground text-lg mb-8">
            Запишитесь на первичную консультацию. Разберём вашу ситуацию и
            наметим стратегию.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="border-white/30 text-primary bg-popover hover:bg-white/10 hover:text-white dark:border-border dark:text-foreground dark:hover:bg-muted"
            >
              <a href="tel:+79991234567">
                <Phone className="mr-2 w-4 h-4" />
                Позвонить
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
