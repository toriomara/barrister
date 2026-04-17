"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const IMAGES = [
  "/diplomas/lawer_2014.jpg",
  "/diplomas/certificate.webp",
  "/diplomas/certificate_2023.jpg",
  "/diplomas/certificate_2024.jpg",
  "/diplomas/certificate_2.webp",
  "/diplomas/certificate_3.webp",
  "/diplomas/certificate_4.webp",
  "/diplomas/certificate_5.webp",
  "/diplomas/certificate_6.webp",
];

const TOTAL = IMAGES.length;

export function CertificatesSlider() {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const containerWidth = trackRef.current.offsetWidth;
      const count = containerWidth >= 900 ? 3 : containerWidth >= 560 ? 2 : 1;
      setVisibleCount(count);
      setCardWidth(containerWidth / count);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = TOTAL - visibleCount;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-1">
              Достижения
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">
              Грамоты и сертификаты
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Предыдущий"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Следующий"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider viewport */}
        <div className="overflow-hidden" ref={trackRef}>
          <motion.div
            className="flex"
            animate={{ x: cardWidth > 0 ? -index * cardWidth : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                style={{ minWidth: cardWidth > 0 ? cardWidth : undefined }}
                className="px-3"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border relative select-none">
                  <Image
                    src={IMAGES[i]}
                    alt={`Грамота ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
