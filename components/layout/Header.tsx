"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "Об\u00A0адвокате" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

function PracticeDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const isPracticeActive = pathname.startsWith("/practice");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
          isPracticeActive
            ? "bg-primary/10 text-primary"
            : "text-foreground/70 hover:text-foreground hover:bg-muted",
        )}
      >
        Практика
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            <Link
              href="/practice"
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2.5 text-sm font-semibold border-b border-border transition-colors",
                pathname === "/practice"
                  ? "text-primary bg-primary/5"
                  : "text-foreground/80 hover:bg-muted",
              )}
            >
              Все направления
            </Link>
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/practice/${area.slug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm transition-colors",
                  pathname === `/practice/${area.slug}`
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {area.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobilePracticeOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
            <PracticeDropdown pathname={pathname} />
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:text-white dark:bg-transparent dark:border-border dark:text-foreground dark:hover:bg-muted hover:text-primary/70"
            >
              <a href="tel:+79608670139">
                <Phone className="mr-2 w-4 h-4" />
                +7 (960) 867-01-39
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Practice accordion */}
              <button
                onClick={() => setMobilePracticeOpen((v) => !v)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-colors text-left",
                  pathname.startsWith("/practice")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                Практика
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    mobilePracticeOpen && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence>
                {mobilePracticeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden pl-4"
                  >
                    <Link
                      href="/practice"
                      className={cn(
                        "block px-4 py-2 rounded-md text-sm font-semibold transition-colors",
                        pathname === "/practice"
                          ? "text-primary"
                          : "text-foreground/60 hover:text-foreground hover:bg-muted",
                      )}
                    >
                      Все направления
                    </Link>
                    {PRACTICE_AREAS.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/practice/${area.slug}`}
                        className={cn(
                          "block px-4 py-2 rounded-md text-sm transition-colors",
                          pathname === `/practice/${area.slug}`
                            ? "text-primary"
                            : "text-foreground/60 hover:text-foreground hover:bg-muted",
                        )}
                      >
                        {area.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button asChild className="mt-2">
                <Link href="/contacts">Записаться на консультацию</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
