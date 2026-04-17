'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Shield, Scale, Briefcase, Users, Home, FileText, ScrollText,
  CheckCircle2, ArrowRight, Phone,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PracticeArea {
  id: string
  icon: React.ElementType
  title: string
  experience: string
  description: string
  highlights: string[]
  stats: { label: string; value: string }[]
}

const AREAS: PracticeArea[] = [
  {
    id: 'criminal',
    icon: Shield,
    title: 'Уголовное право',
    experience: '18 лет в уголовных делах',
    description:
      'Уголовная защита — моя основная и наиболее глубокая специализация. Веду дела с момента первого допроса до вынесения приговора и его обжалования. Работаю как в интересах обвиняемых, так и потерпевших.',
    highlights: [
      'Защита по делам об экономических преступлениях (ст. 159, 160, 172 УК РФ)',
      'Дела о преступлениях против личности (убийства, причинение вреда здоровью)',
      'Наркотические составы: переквалификация и минимизация наказания',
      'Обжалование приговоров в апелляции, кассации, надзоре',
      'Защита на стадии доследственной проверки и следствия',
      'Представление интересов потерпевших и гражданских истцов',
    ],
    stats: [
      { label: 'Лет практики', value: '18+' },
      { label: 'Уголовных дел', value: '300+' },
      { label: 'Оправдательных приговоров', value: '12' },
    ],
  },
  {
    id: 'civil',
    icon: Scale,
    title: 'Гражданские споры',
    experience: '18 лет в судах общей юрисдикции',
    description:
      'Представляю интересы физических и юридических лиц в судах общей юрисдикции по имущественным, договорным и деликтным спорам. Добиваюсь реального исполнения судебных решений.',
    highlights: [
      'Взыскание долгов и убытков по договорам',
      'Споры о праве собственности, разделе имущества',
      'Возмещение ущерба от ДТП, залива, пожара',
      'Защита прав потребителей (ДДУ, страхование, банки)',
      'Оспаривание сделок и признание их недействительными',
    ],
    stats: [
      { label: 'Лет практики', value: '18+' },
      { label: 'Гражданских дел', value: '400+' },
      { label: 'Процент побед', value: '87%' },
    ],
  },
  {
    id: 'arbitration',
    icon: Briefcase,
    title: 'Арбитражные дела',
    experience: 'Представление бизнеса в арбитражных судах',
    description:
      'Сопровождаю бизнес в арбитражных спорах с контрагентами, налоговыми органами, в процедурах банкротства. Умею выстраивать позицию с учётом интересов бизнеса, а не только юридической теории.',
    highlights: [
      'Взыскание задолженности с контрагентов через арбитражный суд',
      'Налоговые споры: оспаривание доначислений и штрафов',
      'Банкротство: защита должника, включение в реестр кредиторов',
      'Корпоративные конфликты между участниками ООО',
      'Оспаривание сделок и торгов',
    ],
    stats: [
      { label: 'Лет практики', value: '12+' },
      { label: 'Арбитражных дел', value: '150+' },
      { label: 'Взыскано (млн ₽)', value: '180+' },
    ],
  },
  {
    id: 'family',
    icon: Users,
    title: 'Семейное право',
    experience: 'Деликатные семейные споры',
    description:
      'Семейные дела требуют не только юридической компетентности, но и такта. Помогаю защитить права родителей и детей при разводе, разделе имущества и спорах об алиментах, не доводя ситуацию до излишней конфронтации.',
    highlights: [
      'Раздел совместно нажитого имущества (квартиры, бизнес, авто)',
      'Определение места жительства и порядка общения с ребёнком',
      'Взыскание алиментов и их индексация',
      'Лишение и оспаривание родительских прав',
      'Оспаривание брачного договора',
    ],
    stats: [
      { label: 'Семейных дел', value: '200+' },
      { label: 'Дел о детях', value: '80+' },
      { label: 'Успешных разделов', value: '120+' },
    ],
  },
  {
    id: 'housing',
    icon: Home,
    title: 'Жилищные споры',
    experience: 'Защита прав на недвижимость',
    description:
      'Жильё — один из самых чувствительных вопросов. Веду дела о признании права собственности, вселении и выселении, защите дольщиков и спорах с управляющими компаниями.',
    highlights: [
      'Признание права собственности на квартиру, дом, долю',
      'Взыскание неустойки с застройщика по ДДУ',
      'Выселение и вселение через суд',
      'Снятие с регистрационного учёта без согласия',
      'Споры с управляющими компаниями и ТСЖ',
    ],
    stats: [
      { label: 'Жилищных дел', value: '120+' },
      { label: 'Дел с застройщиками', value: '40+' },
      { label: 'Процент побед', value: '91%' },
    ],
  },
  {
    id: 'admin',
    icon: FileText,
    title: 'Административные дела',
    experience: 'Оспаривание решений органов власти',
    description:
      'Защищаю граждан и организации от незаконных действий государственных органов и должностных лиц. Обжалую штрафы, оспариваю решения по КоАП и КАС РФ.',
    highlights: [
      'Обжалование штрафов ГИБДД, оспаривание лишения прав',
      'Оспаривание постановлений по делам о нарушениях',
      'КАС: оспаривание решений органов власти',
      'Защита при проверках Роспотребнадзора, Роструда',
      'Оспаривание кадастровой стоимости недвижимости',
    ],
    stats: [
      { label: 'Административных дел', value: '250+' },
      { label: 'Отменённых штрафов', value: '180+' },
      { label: 'Процент побед', value: '72%' },
    ],
  },
  {
    id: 'inheritance',
    icon: ScrollText,
    title: 'Наследственные споры',
    experience: 'Защита наследственных прав',
    description:
      'Помогаю вступить в наследство при пропущенном сроке, оспорить завещание, защитить обязательную долю и разделить наследственное имущество между несогласными наследниками.',
    highlights: [
      'Восстановление срока принятия наследства через суд',
      'Оспаривание завещания (недействительность, подделка)',
      'Выделение обязательной доли в наследстве',
      'Раздел наследственного имущества',
      'Признание наследника недостойным',
    ],
    stats: [
      { label: 'Наследственных дел', value: '90+' },
      { label: 'Оспоренных завещаний', value: '25+' },
      { label: 'Процент побед', value: '84%' },
    ],
  },
]

function AreaCard({ area, index }: { area: PracticeArea; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = area.icon

  return (
    <motion.div
      ref={ref}
      id={area.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">{area.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{area.experience}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {area.stats.map((s) => (
              <div key={s.label} className="bg-muted/60 rounded-lg p-3 text-center">
                <div className="font-serif text-lg font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground leading-tight mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>

          {/* Highlights */}
          <ul className="space-y-2">
            {area.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function PracticeContent() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AREAS.map((area, i) => (
              <AreaCard key={area.id} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Ваше дело — в надёжных руках
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            18 лет практики и более 1000 доверителей. Расскажите о своей ситуации —
            и я найду оптимальное решение.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="gold">
              <Link href="/contacts">
                Записаться на консультацию
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-card text-primary hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+79991234567">
                <Phone className="mr-2 w-4 h-4" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
