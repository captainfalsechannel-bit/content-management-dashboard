import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, BarChart3, CalendarDays, Users, Newspaper } from "lucide-react";

const sections = [
  {
    title: "Instagram Manager",
    description: "Manage posts, stories, and engagement across your Instagram accounts.",
    icon: Camera,
    href: "/instagram",
    color: "text-pink-400",
  },
  {
    title: "Analytics",
    description: "Track performance metrics, growth trends, and audience insights.",
    icon: BarChart3,
    href: "/analytics",
    color: "text-blue-400",
  },
  {
    title: "Content Calendar",
    description: "Plan and schedule content across all your platforms in one place.",
    icon: CalendarDays,
    href: "/calendar",
    color: "text-green-400",
  },
  {
    title: "Competitor Tracker",
    description: "Monitor competitor activity, benchmarks, and market positioning.",
    icon: Users,
    href: "/competitors",
    color: "text-yellow-400",
  },
  {
    title: "News Consolidator",
    description: "Aggregate industry news and trending topics relevant to your niche.",
    icon: Newspaper,
    href: "/news",
    color: "text-purple-400",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to your content management hub. Navigate to any section to get started."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.href} href={section.href} className="group">
              <Card className="h-full transition-colors hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--accent))]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-6 w-6 ${section.color}`} />
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <CardTitle className="text-base mt-3">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{section.description}</CardDescription>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
