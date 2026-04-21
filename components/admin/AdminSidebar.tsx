"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  LayoutDashboard,
  FileText,
  Briefcase,
  User,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд", exact: true },
  { href: "/admin/posts", icon: FileText, label: "Блог" },
  { href: "/admin/services", icon: Briefcase, label: "Услуги" },
  { href: "/admin/about", icon: User, label: "Об адвокате" },
  { href: "/admin/messages", icon: MessageSquare, label: "Сообщения" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-card border-r border-border hidden md:flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-bold text-sm">Админ</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
        >
          Открыть сайт ↗
        </Link>
      </div>
    </aside>
  );
}
