import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, TrendingUp } from "lucide-react";

const categories = ["All", "Social Media", "Marketing", "AI & Tech", "Creator Economy", "Platform Updates"];

const newsItems = [
  {
    id: 1,
    title: "Instagram Introduces New AI-Powered Content Recommendations for Creators",
    source: "TechCrunch",
    category: "Platform Updates",
    time: "2h ago",
    summary: "Instagram's latest update brings machine learning recommendations to help creators understand what content resonates best with their audience.",
    trending: true,
  },
  {
    id: 2,
    title: "Short-Form Video Continues to Dominate Engagement Metrics in 2026",
    source: "Social Media Today",
    category: "Social Media",
    time: "4h ago",
    summary: "New research confirms that Reels and short-form clips generate 3x more engagement than static posts across major platforms.",
    trending: true,
  },
  {
    id: 3,
    title: "Creator Economy Expected to Reach $480B by End of 2026",
    source: "Forbes",
    category: "Creator Economy",
    time: "6h ago",
    summary: "Industry analysts project continued explosive growth in the creator economy, driven by brand partnerships and direct monetization features.",
    trending: false,
  },
  {
    id: 4,
    title: "New FTC Guidelines Require Clearer Disclosure for Sponsored Content",
    source: "Marketing Week",
    category: "Marketing",
    time: "8h ago",
    summary: "Updated regulations will require influencers to use more prominent disclosures when posting sponsored content across all platforms.",
    trending: false,
  },
  {
    id: 5,
    title: "AI Tools Are Changing How Brands Approach Content Strategy",
    source: "Wired",
    category: "AI & Tech",
    time: "12h ago",
    summary: "From copywriting to visual generation, AI is becoming embedded in the day-to-day workflows of content teams at brands of all sizes.",
    trending: true,
  },
  {
    id: 6,
    title: "Platform Algorithm Changes: What Creators Need to Know",
    source: "Digiday",
    category: "Platform Updates",
    time: "1d ago",
    summary: "Recent shifts in Instagram's and TikTok's distribution algorithms are prompting creators to rethink their posting schedules and formats.",
    trending: false,
  },
];

const categoryColors: Record<string, string> = {
  "Social Media": "bg-blue-500/20 text-blue-400",
  "Marketing": "bg-green-500/20 text-green-400",
  "AI & Tech": "bg-purple-500/20 text-purple-400",
  "Creator Economy": "bg-yellow-500/20 text-yellow-400",
  "Platform Updates": "bg-pink-500/20 text-pink-400",
};

export default function NewsPage() {
  return (
    <div>
      <PageHeader
        title="News Consolidator"
        description="Stay up to date with the latest industry news and trending topics."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === "All" ? "default" : "outline"}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {newsItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`text-[10px] ${categoryColors[item.category] || ""}`} variant="outline">
                    {item.category}
                  </Badge>
                  {item.trending && (
                    <span className="flex items-center gap-1 text-[10px] text-orange-400">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] shrink-0">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <CardTitle className="text-sm leading-snug mt-2">{item.title}</CardTitle>
              <CardDescription className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
                {item.source}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.summary}</p>
              <Button variant="ghost" size="sm" className="self-start -ml-2 h-7 text-xs">
                <ExternalLink className="h-3 w-3" />
                Read more
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
