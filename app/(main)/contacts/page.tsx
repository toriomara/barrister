import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contacts/ContactForm";
import { ContactInfo } from "@/components/contacts/ContactInfo";

export const metadata: Metadata = {
  title: "Контакты — Записаться на консультацию",
  description:
    "Свяжитесь с адвокатом Мордвинцевым Р.Ф. Запишитесь на консультацию по телефону или через форму обратной связи.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        title="Контакты"
        subtitle="Запишитесь на консультацию"
        breadcrumbs={[{ label: "Контакты" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <iframe
        className="w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] border rounded-md grayscale-[0.8] hover:saturate-[7] transition-all duration-1000"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.4305638248998!2d44.52146907645624!3d48.716363971313235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411acb2f1cbd376d%3A0x30beec0f42a34a35!2sKommunisticheskaya%20Ulitsa%2C%2021%2C%20Volgograd%2C%20Volgogradskaya%20oblast&#39;%2C%20400005!5e0!3m2!1sen!2sru!4v1730895414415!5m2!1sen!2sru"
        // allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
