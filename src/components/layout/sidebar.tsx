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

const navItems = [
  { label: "Dashboard",          href: "/",           icon: LayoutDashboard },
  { label: "Instagram Manager",  href: "/instagram",  icon: Camera },
  { label: "Analytics",          href: "/analytics",  icon: BarChart3 },
  { label: "Content Calendar",   href: "/calendar",   icon: CalendarDays },
  { label: "Competitor Tracker", href: "/competitors",icon: Users },
  { label: "News Consolidator",  href: "/news",       icon: Newspaper },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex h-screen w-60 shrink-0 flex-col border-r"
      style={{ backgroundColor: "#13131a", borderColor: "#2a2a2e" }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-5 border-b" style={{ borderColor: "#2a2a2e" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#8b5cf6" }}>C</div>
          <span className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>CMS Dashboard</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? "#8b5cf620" : "transparent",
                color: isActive ? "#8b5cf6" : "#8b8b9a",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#ffffff08";
                  e.currentTarget.style.color = "#f1f1f3";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#8b8b9a";
                }
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "#2a2a2e" }}>
        <p className="text-xs" style={{ color: "#8b8b9a" }}>Content Management v1.0</p>
      </div>
    </aside>
  );
}
