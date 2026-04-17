import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FaTelegramPlane, FaWhatsapp, FaVk, FaViber } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-card border-t border-zinc-300 dark:border-border mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 justify-between items-start text-zinc-900 dark:text-zinc-300">
          {/* Brand */}
          <div className="grid gap-4 lg:col-span-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/logo.svg"
                alt="Logo"
                width={180}
                className="dark:hidden"
              />
              <img
                src="/logo/logo-white.svg"
                alt="Logo"
                width={180}
                className="hidden dark:block"
              />
            </Link>
            <a
              className="link flex gap-1 text-sm hover:text-primary transition-colors group"
              href="https://www.apvo-volgograd.ru/lawyer-list/register-lawyers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="leading-5">
                Регистрационный номер 34/1803 в Едином государственном реестре
                адвокатов
                <HiOutlineExternalLink
                  size={14}
                  className="inline-flex ml-1 -mt-1 shrink-0 text-zinc-400 group-hover:text-primary"
                />
              </span>
            </a>
            <p className="text-sm">
              Деятельность осуществляется на основе Федерального закона от 31
              мая 2002&nbsp;г. N&nbsp;63-ФЗ «Об адвокатской деятельности и
              адвокатуре в Российской Федерации»
            </p>
            <Link
              className="link text-sm hover:text-primary transition-colors"
              href="/privacy"
            >
              Политика в отношении обработки персональных данных
            </Link>
          </div>

          {/* Navigation */}
          <div className="grid gap-3 lg:col-span-2 md:col-span-1">
            <h4 className="font-semibold text-lg">Информация</h4>
            <div className="grid gap-2">
              <Link
                className="link text-sm hover:text-primary transition-colors"
                href="/"
              >
                Главная
              </Link>
              <Link
                className="link text-sm hover:text-primary transition-colors"
                href="/services"
              >
                Услуги
              </Link>
              <Link
                className="link text-sm hover:text-primary transition-colors"
                href="/about"
              >
                Об адвокате
              </Link>
              <Link
                className="link text-sm hover:text-primary transition-colors"
                href="/blog"
              >
                Блог
              </Link>
            </div>
          </div>

          {/* Contacts */}
          <div className="grid gap-3 lg:col-span-4 md:col-span-1">
            <h4 className="font-semibold text-lg">Контакты</h4>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
              <span className="leading-5">
                400005, г. Волгоград,
                <br />
                ул. Коммунистическая, д.21, оф. 46
              </span>
            </div>
            <a
              href="mailto:r.mordvintseff@yandex.ru"
              className="link flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-zinc-500" />
              r.mordvintseff@yandex.ru
            </a>
            <a
              href="tel:+79608670139"
              className="link flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-zinc-500" />
              +7 960 867 01 39
            </a>
          </div>

          {/* Question */}
          <div className="grid gap-4 lg:col-span-2 md:col-span-1">
            <h4 className="font-semibold text-lg">Вопрос</h4>
            <span className="text-sm">
              Задать вопрос адвокату
            </span>
            <Link
              href="/contacts"
              className="inline-flex w-fit items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Написать
            </Link>
          </div>
        </div>

        <Separator className="my-6 bg-zinc-300 dark:bg-border" />

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="space-y-1">
            <div>
              © {new Date().getFullYear()} Адвокат Р.Ф. Мордвинцев. Все права
              защищены.
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://telegram.me/advocatemrf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Telegram"
            >
              <FaTelegramPlane size={22} />
            </a>
            <a
              href="https://wa.me/+79608670139"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="https://vk.com/id125353967"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="ВКонтакте"
            >
              <FaVk size={22} />
            </a>
            <a
              href="viber://add?number=+79608670139"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Viber"
            >
              <FaViber size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
