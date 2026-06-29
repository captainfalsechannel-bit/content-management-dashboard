import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Eye, MousePointerClick, Activity } from "lucide-react";

const kpis = [
  { label: "Total Impressions", value: "142,830", change: "+18.4%", trend: "up", icon: Eye },
  { label: "Profile Visits", value: "31,204", change: "+9.7%", trend: "up", icon: Users },
  { label: "Link Clicks", value: "4,918", change: "-2.1%", trend: "down", icon: MousePointerClick },
  { label: "Engagement Rate", value: "5.2%", change: "+0.8%", trend: "up", icon: Activity },
];

const topContent = [
  { title: "Summer Campaign Reel", platform: "Instagram", impressions: "28,400", engagement: "7.2%" },
  { title: "Product Tutorial Video", platform: "Instagram", impressions: "19,850", engagement: "6.1%" },
  { title: "Behind the Scenes Story", platform: "Instagram", impressions: "14,200", engagement: "5.8%" },
  { title: "User Spotlight Feature", platform: "Instagram", impressions: "11,730", engagement: "4.9%" },
  { title: "Weekly Q&A Session", platform: "Instagram", impressions: "9,610", engagement: "4.3%" },
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Track your content performance and audience growth across all platforms."
      />

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{kpi.label}</CardDescription>
                  <Icon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className={`flex items-center gap-1 text-xs mt-1 ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change} vs last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your best content by impressions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topContent.map((item, index) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[hsl(var(--muted-foreground))] w-5">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.impressions} impressions</p>
                  </div>
                  <Badge variant="secondary">{item.engagement}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Breakdown of your audience profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "18–24", pct: 32 },
                { label: "25–34", pct: 41 },
                { label: "35–44", pct: 18 },
                { label: "45+", pct: 9 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">Age {item.label}</span>
                    <span className="font-medium">{item.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[hsl(var(--secondary))]">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--primary))]"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
