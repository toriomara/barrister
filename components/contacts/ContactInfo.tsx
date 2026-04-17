"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contacts = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (999) 123-45-67",
    href: "tel:+79991234567",
    desc: "Пн-Пт: 9:00–19:00, Сб: 10:00–15:00",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ivanov@lawyer.ru",
    href: "mailto:ivanov@lawyer.ru",
    desc: "Ответ в течение 24 часов",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Москва, ул. Тверская, д. 10, офис 205",
    href: null,
    desc: "Удобная парковка рядом",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн-Пт: 9:00–19:00",
    href: null,
    desc: "Суббота: 10:00–15:00",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold mb-2">Как связаться</h2>
        <p className="text-muted-foreground">Выберите удобный способ связи.</p>
        <p className="text-muted-foreground mt-2">
          Приём осуществляется только по предварительной записи. Вы можете
          записаться в любое удобное время, позвонив или отправив сообщение на
          указанный номер мобильного телефона.
        </p>
      </div>

      <div className="space-y-4">
        {contacts.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-medium">{item.value}</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
