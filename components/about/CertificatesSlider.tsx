"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import Image from "next/image";

interface Certificate {
  id: string;
  title: string | null;
  fileUrl: string;
  fileType: string;
  order: number;
}

interface CertificatesSliderProps {
  certificates: Certificate[];
}

export function CertificatesSlider({ certificates }: CertificatesSliderProps) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = certificates.length;

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

  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    if (total <= visibleCount) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, total, visibleCount]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  if (total === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
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

        <div className="overflow-hidden" ref={trackRef}>
          <motion.div
            className="flex"
            animate={{ x: cardWidth > 0 ? -index * cardWidth : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {certificates.map((cert, i) => (
              <div
                key={cert.id}
                style={{ minWidth: cardWidth > 0 ? cardWidth : undefined }}
                className="px-3"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border relative select-none bg-muted">
                  {cert.fileType === "pdf" ? (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground hover:text-foreground transition-colors p-6"
                    >
                      <FileText className="w-12 h-12" />
                      <span className="text-sm text-center font-medium">
                        {cert.title || "Сертификат"}
                      </span>
                    </a>
                  ) : (
                    <Image
                      src={cert.fileUrl}
                      alt={cert.title || `Грамота ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
