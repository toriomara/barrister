import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Адвокат Мордвинцев Р.Ф.";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const YEARS_OF_PRACTICE = new Date().getFullYear() - 2008;

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Квалифицированная юридическая помощь`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    `Профессиональная юридическая помощь по уголовным, гражданским и административным делам. Более ${YEARS_OF_PRACTICE} лет успешной практики.`,
  keywords: [
    "адвокат",
    "юрист",
    "юридическая помощь",
    "уголовные дела",
    "гражданские споры",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: "Профессиональная юридическая помощь",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: "Профессиональная юридическая помощь",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
