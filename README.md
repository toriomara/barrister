# Сайт частнопрактикующего адвоката

Полноценное веб-приложение на **Next.js 14** (App Router) с административной панелью.

## Стек технологий

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: Tailwind CSS + Shadcn/ui + Framer Motion
- **База данных**: MongoDB через Prisma ORM
- **Аутентификация**: JWT (jose) + HTTP-only cookies
- **Редактор**: Tiptap (rich-text)
- **Формы**: React Hook Form + Zod
- **Email**: Nodemailer
- **Безопасность**: DOMPurify (XSS-защита), bcryptjs

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

```bash
cp .env.example .env.local
```

Заполните `.env.local`:

```env
DATABASE_URL="mongodb+srv://..."   # MongoDB Atlas или локальный MongoDB
JWT_SECRET="min-32-char-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="yourpassword"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your@gmail.com"
SMTP_PASS="app-password"
```

### 3. Инициализация БД

```bash
# Генерация Prisma клиента
npm run prisma:generate

# Применение схемы
npm run prisma:push

# Заполнение тестовыми данными (создаёт admin-пользователя)
npm run prisma:seed
```

### 4. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

Административная панель: [http://localhost:3000/admin](http://localhost:3000/admin)

## Структура проекта

```
barister/
├── app/
│   ├── (main)/           # Публичная часть сайта
│   │   ├── page.tsx      # Главная
│   │   ├── services/     # Услуги
│   │   ├── about/        # Об адвокате
│   │   ├── blog/         # Блог + [slug]
│   │   └── contacts/     # Контакты
│   ├── admin/            # Административная панель
│   │   ├── login/
│   │   ├── posts/
│   │   ├── services/
│   │   ├── about/
│   │   └── messages/
│   └── api/              # API маршруты
├── components/
│   ├── ui/               # shadcn/ui компоненты
│   ├── layout/           # Header, Footer, ThemeToggle
│   ├── home/             # Секции главной страницы
│   ├── blog/             # Компоненты блога
│   ├── services/         # Компоненты услуг
│   ├── about/            # Компоненты страницы "Об адвокате"
│   ├── contacts/         # Форма контактов
│   ├── admin/            # Компоненты админ-панели
│   ├── shared/           # Общие компоненты
│   └── providers/        # ThemeProvider
├── lib/
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # JWT утилиты
│   ├── mail.ts           # Nodemailer
│   ├── utils.ts          # Утилиты (cn, slugify, formatDate)
│   └── logger.ts         # Логирование
├── schemas/              # Zod схемы валидации
├── hooks/                # React хуки
├── prisma/
│   ├── schema.prisma     # Схема БД
│   └── seed.ts           # Начальные данные
└── middleware.ts          # Защита /admin/*
```

## Функциональность

### Публичная часть
- Главная страница с Hero, статистикой, превью услуг и CTA
- Страница услуг с раскрывающимися описаниями
- Страница «Об адвокате» с образованием, сертификатами, опытом
- Блог: список постов с пагинацией, детальный просмотр
- Форма контактов с отправкой email-уведомлений

### Административная панель (`/admin`)
- Защита через JWT (middleware)
- CRUD для постов блога с rich-text редактором Tiptap
- CRUD для услуг
- Редактирование информации об адвокате
- Просмотр входящих сообщений

### Дизайн
- Светлая и тёмная темы (next-themes)
- Адаптивная верстка (mobile-first)
- Анимации через Framer Motion
- SEO-оптимизация (metadata API Next.js)

## Настройка MongoDB

Используйте [MongoDB Atlas](https://www.mongodb.com/atlas) (бесплатный tier):
1. Создайте кластер
2. Добавьте пользователя БД
3. Получите строку подключения
4. Вставьте в `DATABASE_URL`

## Gmail SMTP

Для отправки писем через Gmail:
1. Включите двухфакторную аутентификацию
2. Создайте "App Password" в настройках Google
3. Используйте его как `SMTP_PASS`
