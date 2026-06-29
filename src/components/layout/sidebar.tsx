"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  BarChart3,
  CalendarDays,
  Users,
  Newspaper,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Instagram Manager",
    href: "/instagram",
    icon: Camera,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Content Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Competitor Tracker",
    href: "/competitors",
    icon: Users,
  },
  {
    label: "News Consolidator",
    href: "/news",
    icon: Newspaper,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-[hsl(var(--sidebar))] border-r border-[hsl(var(--sidebar-border))]">
      <div className="flex h-16 items-center px-6">
        <span className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">
          CMS Dashboard
        </span>
      </div>

      <Separator className="bg-[hsl(var(--sidebar-border))]" />

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--primary))]"
                  : "text-[hsl(var(--sidebar-muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-[hsl(var(--sidebar-border))]" />

      <div className="p-4">
        <p className="text-xs text-[hsl(var(--sidebar-muted-foreground))]">
          Content Management v1.0
        </p>
      </div>
    </aside>
  );
}
