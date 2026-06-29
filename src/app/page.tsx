import { Camera, BarChart3, CalendarDays, Users, Newspaper } from "lucide-react";

const sections = [
  {
    title: "Instagram Manager",
    description: "Manage posts, stories, and engagement. Kanban board with full CRUD.",
    icon: Camera,
    href: "/instagram",
    iconColor: "#ec4899",
    iconBg: "#ec489920",
  },
  {
    title: "Analytics",
    description: "Track impressions, engagement rate, follower growth, and link clicks.",
    icon: BarChart3,
    href: "/analytics",
    iconColor: "#3b82f6",
    iconBg: "#3b82f620",
  },
  {
    title: "Content Calendar",
    description: "Monthly view with multi-platform scheduling and status tracking.",
    icon: CalendarDays,
    href: "/calendar",
    iconColor: "#22c55e",
    iconBg: "#22c55e20",
  },
  {
    title: "Competitor Tracker",
    description: "Sortable table of competitors with sparklines, growth, and engagement.",
    icon: Users,
    href: "/competitors",
    iconColor: "#f59e0b",
    iconBg: "#f59e0b20",
  },
  {
    title: "News Consolidator",
    description: "Curated industry news with category filters and live search.",
    icon: Newspaper,
    href: "/news",
    iconColor: "#8b5cf6",
    iconBg: "#8b5cf620",
  },
];

export default function DashboardPage() {
  return (
    <div style={{ color: "#f1f1f3" }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm" style={{ color: "#8b8b9a" }}>Welcome to your content management hub. Select a section to get started.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <a
              key={section.href}
              href={section.href}
              className="group block rounded-xl p-5 transition-all"
              style={{ backgroundColor: "#1c1c24", border: "1px solid #2a2a2e" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = section.iconColor + "60";
                e.currentTarget.style.backgroundColor = "#1c1c24";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#2a2a2e";
                e.currentTarget.style.backgroundColor = "#1c1c24";
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: section.iconBg }}
              >
                <Icon className="w-5 h-5" style={{ color: section.iconColor }} />
              </div>
              <h2 className="text-sm font-semibold mb-1.5" style={{ color: "#f1f1f3" }}>{section.title}</h2>
              <p className="text-xs leading-relaxed" style={{ color: "#8b8b9a" }}>{section.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
