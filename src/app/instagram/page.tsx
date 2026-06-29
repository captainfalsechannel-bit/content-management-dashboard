import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ImageIcon, Heart, MessageCircle, Share2 } from "lucide-react";

const mockPosts = [
  { id: 1, caption: "Morning coffee vibes ☕", likes: 1284, comments: 47, shares: 12, status: "Published" },
  { id: 2, caption: "Behind the scenes of our latest shoot 📸", likes: 892, comments: 31, shares: 8, status: "Published" },
  { id: 3, caption: "New product drop coming soon! 🔥", likes: 0, comments: 0, shares: 0, status: "Scheduled" },
  { id: 4, caption: "Weekend inspo for your feed", likes: 0, comments: 0, shares: 0, status: "Draft" },
];

const stats = [
  { label: "Followers", value: "24.8K", change: "+3.2%" },
  { label: "Avg. Reach", value: "8,420", change: "+12.1%" },
  { label: "Engagement Rate", value: "4.7%", change: "+0.3%" },
  { label: "Posts This Month", value: "18", change: "+6" },
];

export default function InstagramPage() {
  return (
    <div>
      <PageHeader
        title="Instagram Manager"
        description="Manage your Instagram content, schedule posts, and track engagement."
      >
        <Button>
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-green-400 mt-1">{stat.change} this month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Your latest content and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[hsl(var(--secondary))]">
                  <ImageIcon className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.caption}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <Heart className="h-3 w-3" /> {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <MessageCircle className="h-3 w-3" /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <Share2 className="h-3 w-3" /> {post.shares}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    post.status === "Published"
                      ? "default"
                      : post.status === "Scheduled"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {post.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
