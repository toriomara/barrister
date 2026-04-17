import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: 'Администратор',
        role: 'ADMIN',
      },
    })
    console.log('✅ Admin user created:', adminEmail)
  } else {
    console.log('ℹ️ Admin user already exists')
  }

  // Create about page
  const aboutExists = await prisma.about.findFirst()
  if (!aboutExists) {
    await prisma.about.create({
      data: {
        name: 'Мордвинцев Роман Федорович',
        title: 'Адвокат',
        bio: 'Регистрационный номер 34/1803 в Едином государственном реестре адвокатов. Деятельность осуществляется на основе Федерального закона от 31 мая 2002 г. N 63-ФЗ «Об адвокатской деятельности и адвокатуре в Российской Федерации».',
        phone: '+7 960 867 01 39',
        email: 'r.mordvintseff@yandex.ru',
        address: '400005, г. Волгоград, ул. Коммунистическая, д.21, оф. 46',
        education: [],
        certificates: [
          {
            year: '',
            title: 'Регистрационный номер 34/1803',
            issuer: 'Единый государственный реестр адвокатов',
          },
        ],
        experience: [],
      },
    })
    console.log('✅ About page created')
  }

  // Create services
  const servicesCount = await prisma.service.count()
  if (servicesCount === 0) {
    const services = [
      {
        title: 'Представительство в суде',
        slug: 'predstavitelstvo-v-sude',
        description: 'Защита интересов в гражданских, уголовных и арбитражных процессах',
        details: null,
        icon: 'Scale',
        order: 1,
      },
      {
        title: 'Уголовные дела',
        slug: 'ugolovnye-dela',
        description: 'Помощь на всех стадиях уголовного судопроизводства, защита прав подозреваемых и обвиняемых',
        details: 'Оказываю юридическую помощь подозреваемым, обвиняемым и подсудимым. Обжалование приговоров, участие в следственных действиях, ходатайства об изменении меры пресечения.',
        icon: 'Gavel',
        order: 2,
      },
      {
        title: 'Гражданские споры',
        slug: 'grazhdanskie-spory',
        description: 'Разрешение споров, связанных с недвижимостью, наследством, долгами и другими вопросами',
        details: 'Представляю интересы клиентов по делам о взыскании задолженностей, спорам о разделе имущества, защите прав потребителей, трудовым конфликтам.',
        icon: 'ShieldCheck',
        order: 3,
      },
      {
        title: 'Составление и анализ договоров',
        slug: 'sostavlenie-i-analiz-dogovorov',
        description: 'Разработка юридически грамотных контрактов и проверка документов',
        details: null,
        icon: 'FileText',
        order: 4,
      },
      {
        title: 'Семейные споры',
        slug: 'semeynye-spory',
        description: 'Развод, раздел имущества и споры, касающиеся воспитания детей',
        details: 'Ведение бракоразводных процессов, споров о разделе совместно нажитого имущества, взыскание и изменение размера алиментов, определение порядка общения с детьми.',
        icon: 'Users',
        order: 5,
      },
      {
        title: 'Жилищные вопросы',
        slug: 'zhilishchnye-voprosy',
        description: 'Сопровождение сделок с недвижимостью, споры по правам собственности, выселение, аренда',
        details: null,
        icon: 'House',
        order: 6,
      },
      {
        title: 'Защита прав потребителей',
        slug: 'zashchita-prav-potrebiteley',
        description: 'Помощь в возврате товара, получении компенсации, споры с магазинами и застройщиками',
        details: null,
        icon: 'ShoppingCart',
        order: 7,
      },
      {
        title: 'Автоюрист',
        slug: 'avtoyurist',
        description: 'Споры со страховыми, ДТП, возмещение ущерба, лишение прав и обжалование штрафов',
        details: null,
        icon: 'Car',
        order: 8,
      },
      {
        title: 'Долги и банкротство',
        slug: 'dolgi-i-bankrotstvo',
        description: 'Защита должников, взыскание задолженности, помощь при банкротстве',
        details: null,
        icon: 'Banknote',
        order: 9,
      },
      {
        title: 'Наследственные дела',
        slug: 'nasledstvennye-dela',
        description: 'Оспаривание завещаний, вступление в наследство, раздел имущества',
        details: null,
        icon: 'ScrollText',
        order: 10,
      },
      {
        title: 'Медиация и переговоры',
        slug: 'mediatsiya-i-peregovory',
        description: 'Досудебное урегулирование споров, защита интересов в переговорах',
        details: null,
        icon: 'Handshake',
        order: 11,
      },
      {
        title: 'Юридическое сопровождение проверок',
        slug: 'yuridicheskoe-soprovozhdenie-proverok',
        description: 'Консультации и защита интересов при проверках гос. органов',
        details: null,
        icon: 'UserSearch',
        order: 12,
      },
    ]

    for (const service of services) {
      await prisma.service.create({ data: service })
    }
    console.log('✅ Services created')
  }

  // Create sample blog posts
  const postsCount = await prisma.post.count()
  if (postsCount === 0) {
    await prisma.post.create({
      data: {
        title: 'Как правильно выбрать адвоката: 7 ключевых критериев',
        slug: 'kak-vybrat-advokata-7-kriteriev',
        excerpt: 'Выбор адвоката — ответственный шаг. В этой статье мы расскажем о ключевых критериях, которые помогут вам найти квалифицированного специалиста.',
        content: '<h2>Введение</h2><p>Выбор адвоката — один из важнейших шагов в решении правовых проблем. От квалификации и опыта специалиста во многом зависит исход дела.</p><h2>1. Специализация</h2><p>Юридическая практика охватывает множество отраслей. Адвокат, специализирующийся на уголовных делах, может не иметь достаточного опыта в семейных спорах. Уточните, занимался ли специалист делами, аналогичными вашему.</p><h2>2. Опыт и репутация</h2><p>Поинтересуйтесь, сколько лет адвокат работает, какие дела вёл и каковы результаты. Отзывы клиентов и рекомендации коллег — важный показатель профессионализма.</p><h2>3. Наличие адвокатского удостоверения</h2><p>Проверьте, внесён ли адвокат в реестр адвокатской палаты субъекта РФ. Это можно сделать на сайте ФПА России.</p><h2>Заключение</h2><p>Правильный выбор адвоката — залог успешного решения вашей правовой проблемы. Не торопитесь с выбором и обязательно проведите первичную консультацию.</p>',
        published: true,
        publishedAt: new Date('2024-01-15'),
        metaTitle: 'Как выбрать адвоката: 7 критериев | Адвокат Мордвинцев',
        metaDesc: 'Подробное руководство по выбору адвоката: специализация, опыт, репутация и другие важные критерии.',
      },
    })

    await prisma.post.create({
      data: {
        title: 'Ваши права при задержании полицией',
        slug: 'prava-pri-zaderzhanii-policiej',
        excerpt: 'Знание своих прав в момент задержания поможет защитить себя от незаконных действий. Разбираем ключевые положения законодательства.',
        content: '<h2>Что делать, если вас задержали?</h2><p>Задержание — стрессовая ситуация, но важно сохранять спокойствие и знать свои права.</p><h2>Основные права задержанного</h2><ul><li>Право знать основание задержания</li><li>Право на звонок родственникам или адвокату</li><li>Право не свидетельствовать против себя (ст. 51 Конституции РФ)</li><li>Право на юридическую помощь</li></ul><h2>Что категорически нельзя делать</h2><p>Не оказывайте сопротивления, даже если считаете задержание незаконным. Не подписывайте никакие документы без адвоката.</p>',
        published: true,
        publishedAt: new Date('2024-02-10'),
        metaTitle: 'Права при задержании полицией | Адвокат Мордвинцев',
        metaDesc: 'Что делать при задержании полицией: ваши права и порядок действий по закону.',
      },
    })
    console.log('✅ Sample blog posts created')
  }

  console.log('🌱 Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
