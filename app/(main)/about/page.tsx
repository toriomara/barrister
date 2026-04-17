import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { AboutContent } from "@/components/about/AboutContent";

const YEARS_OF_PRACTICE = new Date().getFullYear() - 2008;

export const metadata: Metadata = {
  title: "Об адвокате",
  description: `Мордвинцев Роман Фёдорович — адвокат. Более ${YEARS_OF_PRACTICE} лет успешной практики в области уголовного, гражданского и административного права.`,
};

export const revalidate = 60;

export default async function AboutPage() {
  const about = await prisma.about.findFirst();

  return (
    <>
      <PageHero
        title="Об адвокате"
        subtitle="Биография, образование и опыт"
        breadcrumbs={[{ label: "Об адвокате" }]}
      />
      <AboutContent about={about} />
    </>
  );
}
