"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AboutIntroSection } from "@/components/about/AboutIntroSection";
import { MissionSection } from "@/components/about/MissionSection";
import { HowIWorkSection } from "@/components/about/HowIWorkSection";
import { CertificatesSlider } from "@/components/about/CertificatesSlider";
import { ReviewsSlider } from "@/components/about/ReviewsSlider";

interface AboutData {
  name: string;
  title: string;
  bio: string;
  photo?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  education?: unknown;
  certificates?: unknown;
  experience?: unknown;
}

interface AboutContentProps {
  about: AboutData | null;
}

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export function AboutContent({ about }: AboutContentProps) {
  if (!about) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Информация пока не добавлена
      </div>
    );
  }

  const education =
    (about.education as Array<{
      year: string;
      institution: string;
      degree: string;
    }>) || [];
  const certificates =
    (about.certificates as Array<{
      year: string;
      title: string;
      issuer: string;
    }>) || [];
  const experience =
    (about.experience as Array<{
      period: string;
      position: string;
      description: string;
    }>) || [];

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Main info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Photo */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={sectionVariant}
              className="lg:col-span-1"
            >
              <div className="relative w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-primary/40 dark:from-muted dark:to-card flex items-center justify-center">
                {about.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={about.photo}
                    alt={about.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">👨‍⚖️</span>
                )}
              </div>

              {/* Contact info */}
              <Card className="mt-6">
                <CardContent className="p-4 space-y-3">
                  {about.phone && (
                    <a
                      href={`tel:${about.phone}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      {about.phone}
                    </a>
                  )}
                  {about.email && (
                    <a
                      href={`mailto:${about.email}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      {about.email}
                    </a>
                  )}
                  {about.address && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {about.address}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Bio */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={sectionVariant}
              className="lg:col-span-2"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                {about.name}
              </h2>
              <p className="text-primary font-medium text-lg mb-6">
                {about.title}
              </p>
              <Separator className="mb-6" />
              <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                {about.bio}
              </p>
            </motion.div>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={sectionVariant}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    Образование
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {education.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-sm font-bold text-primary w-12 shrink-0 pt-0.5">
                          {item.year}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {item.degree}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.institution}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={sectionVariant}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    Лицензии и сертификаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificates.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-sm font-bold text-primary w-12 shrink-0 pt-0.5">
                          {item.year}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.issuer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={sectionVariant}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" />
                    Опыт работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-4 border-l-2 border-primary/30 space-y-6">
                    {experience.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                        <div className="text-xs font-medium text-primary mb-1">
                          {item.period}
                        </div>
                        <div className="font-medium text-sm">
                          {item.position}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <AboutIntroSection />
      <MissionSection />
      <HowIWorkSection />

      {/* Harant.ru profile */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
          >
            <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ExternalLink className="w-6 h-6 text-primary shrink-0" />
                  Профиль в harant.ru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Юридическая практика требует не только глубоких знаний закона,
                  но и умения применять их в реальных, зачастую непростых
                  жизненных ситуациях. На протяжении многих лет я оказываю
                  квалифицированную правовую помощь, сочетая строгий
                  аналитический подход с вниманием к деталям и интересам
                  доверителей.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Мой опыт охватывает широкий спектр юридических вопросов — от
                  сложных судебных разбирательств до стратегического правового
                  сопровождения бизнеса. Каждый случай уникален, и моя задача —
                  найти оптимальное решение, обеспечив надёжную правовую защиту.
                  В своей работе я придерживаюсь принципов конфиденциальности,
                  ответственности и безупречного профессионализма.
                </p>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://harant.ru/lawyers/volgograd/mordvinczev-roman-fedorovich/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Перейти на harant.ru
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <CertificatesSlider />
      <ReviewsSlider />
    </>
  );
}
