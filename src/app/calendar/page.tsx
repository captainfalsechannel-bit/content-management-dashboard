import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Camera, Clock } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const scheduledPosts = [
  { id: 1, day: 2, title: "Product launch teaser", platform: "Instagram", time: "9:00 AM", type: "Reel" },
  { id: 2, day: 5, title: "Weekly tips carousel", platform: "Instagram", time: "12:00 PM", type: "Carousel" },
  { id: 3, day: 8, title: "Behind the scenes", platform: "Instagram", time: "3:00 PM", type: "Story" },
  { id: 4, day: 12, title: "Community spotlight", platform: "Instagram", time: "10:00 AM", type: "Post" },
  { id: 5, day: 15, title: "Q2 campaign launch", platform: "Instagram", time: "8:00 AM", type: "Reel" },
  { id: 6, day: 19, title: "User testimonial", platform: "Instagram", time: "2:00 PM", type: "Post" },
  { id: 7, day: 22, title: "Product demo", platform: "Instagram", time: "11:00 AM", type: "Reel" },
  { id: 8, day: 26, title: "Weekend giveaway", platform: "Instagram", time: "9:00 AM", type: "Post" },
  { id: 9, day: 29, title: "Month recap", platform: "Instagram", time: "5:00 PM", type: "Carousel" },
];

const typeColors: Record<string, string> = {
  Reel: "bg-pink-500/20 text-pink-400",
  Carousel: "bg-blue-500/20 text-blue-400",
  Story: "bg-purple-500/20 text-purple-400",
  Post: "bg-green-500/20 text-green-400",
};

export default function CalendarPage() {
  const today = 29;
  const daysInMonth = 30;
  const firstDayOffset = 2;

  const calendarDays: (number | null)[] = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const postsByDay = scheduledPosts.reduce<Record<number, typeof scheduledPosts>>((acc, post) => {
    if (!acc[post.day]) acc[post.day] = [];
    acc[post.day].push(post);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Content Calendar"
        description="Plan and schedule your content across all platforms."
      >
        <Button>
          <Plus className="h-4 w-4" />
          Schedule Post
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>June 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-[hsl(var(--muted-foreground))] py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => (
                  <div
                    key={idx}
                    className={`min-h-16 rounded-md p-1.5 text-xs ${
                      day === today
                        ? "border border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10"
                        : day
                        ? "border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]"
                        : ""
                    }`}
                  >
                    {day && (
                      <>
                        <span className={`font-medium ${day === today ? "text-[hsl(var(--primary))]" : ""}`}>
                          {day}
                        </span>
                        <div className="mt-1 space-y-0.5">
                          {(postsByDay[day] || []).map((post) => (
                            <div
                              key={post.id}
                              className={`truncate rounded px-1 py-0.5 text-[10px] ${typeColors[post.type]}`}
                            >
                              {post.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledPosts.slice(0, 6).map((post) => (
                  <div key={post.id} className="flex items-start gap-3 rounded-lg border border-[hsl(var(--border))] p-3">
                    <Camera className="h-4 w-4 text-pink-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{post.title}</p>
                      <p className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                        <Clock className="h-3 w-3" />
                        Jun {post.day} · {post.time}
                      </p>
                    </div>
                    <Badge className={`text-[10px] shrink-0 ${typeColors[post.type]}`} variant="outline">
                      {post.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
