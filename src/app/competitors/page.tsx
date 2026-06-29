import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";

const competitors = [
  {
    name: "BrandAlpha",
    handle: "@brandalpha",
    followers: "142K",
    followersRaw: 142000,
    engagementRate: "3.8%",
    postsPerWeek: 5,
    trend: "up",
    change: "+2.4K",
    tags: ["Lifestyle", "Fashion"],
  },
  {
    name: "ContentCo",
    handle: "@contentco",
    followers: "89K",
    followersRaw: 89000,
    engagementRate: "5.1%",
    postsPerWeek: 7,
    trend: "up",
    change: "+1.1K",
    tags: ["Tech", "Education"],
  },
  {
    name: "MediaHub",
    handle: "@mediahub",
    followers: "211K",
    followersRaw: 211000,
    engagementRate: "2.9%",
    postsPerWeek: 4,
    trend: "down",
    change: "-800",
    tags: ["News", "Media"],
  },
  {
    name: "CreatorSpace",
    handle: "@creatorspace",
    followers: "57K",
    followersRaw: 57000,
    engagementRate: "6.4%",
    postsPerWeek: 9,
    trend: "neutral",
    change: "+120",
    tags: ["Creator Economy"],
  },
];

const benchmarks = [
  { metric: "Followers", you: "24.8K", avg: "124.7K", status: "behind" },
  { metric: "Engagement Rate", you: "4.7%", avg: "4.55%", status: "ahead" },
  { metric: "Posts / Week", you: "4.5", avg: "6.25", status: "behind" },
  { metric: "Avg. Likes", you: "1,160", avg: "2,840", status: "behind" },
];

export default function CompetitorsPage() {
  return (
    <div>
      <PageHeader
        title="Competitor Tracker"
        description="Monitor competitor performance and benchmark your metrics."
      >
        <Button>
          <Plus className="h-4 w-4" />
          Add Competitor
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {competitors.map((comp) => (
          <Card key={comp.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{comp.name}</CardTitle>
                {comp.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : comp.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                ) : (
                  <Minus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                )}
              </div>
              <CardDescription>{comp.handle}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{comp.followers}</p>
              <p className={`text-xs mt-1 ${comp.trend === "up" ? "text-green-400" : comp.trend === "down" ? "text-red-400" : "text-[hsl(var(--muted-foreground))]"}`}>
                {comp.change} this month
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {comp.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
              <div className="mt-3 space-y-1 text-xs text-[hsl(var(--muted-foreground))]">
                <div className="flex justify-between">
                  <span>Engagement</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">{comp.engagementRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Posts/week</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">{comp.postsPerWeek}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benchmark Comparison</CardTitle>
          <CardDescription>How you stack up against the competitor average</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[hsl(var(--border))]">
            {benchmarks.map((b) => (
              <div key={b.metric} className="flex items-center gap-4 py-3">
                <span className="w-36 text-sm text-[hsl(var(--muted-foreground))]">{b.metric}</span>
                <span className="w-20 text-sm font-medium">{b.you}</span>
                <span className="flex-1 text-sm text-[hsl(var(--muted-foreground))]">vs. {b.avg} avg</span>
                <Badge variant={b.status === "ahead" ? "default" : "secondary"}>
                  {b.status === "ahead" ? "Ahead" : "Behind"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
