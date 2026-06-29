"use client";

import { useState, useMemo } from "react";
import { RefreshCw, Search, Clock } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "Marketing" | "Social Media" | "SEO" | "AI" | "Creator Economy" | "Platform Updates";

interface Article {
  id: number;
  title: string;
  source: string;
  sourceInitial: string;
  sourceColor: string;
  category: Category;
  publishedAt: string; // ISO date string
  readTime: number;
  summary: string;
  url: string;
  relevanceScore: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Instagram Rolls Out Expanded AI Editing Suite for Reels Creators",
    source: "TechCrunch",
    sourceInitial: "T",
    sourceColor: "#ef4444",
    category: "Platform Updates",
    publishedAt: "2026-06-29T07:15:00Z",
    readTime: 4,
    summary: "Instagram has launched a new AI-powered editing toolkit allowing creators to auto-caption, reframe clips, and generate B-roll suggestions — all without leaving the app. The update rolls out globally this week.",
    url: "#",
    relevanceScore: 97,
  },
  {
    id: 2,
    title: "Why Short-Form Video Is Still King in 2026 — And What's Coming Next",
    source: "Social Media Today",
    sourceInitial: "S",
    sourceColor: "#3b82f6",
    category: "Social Media",
    publishedAt: "2026-06-29T05:00:00Z",
    readTime: 6,
    summary: "Despite predictions of fatigue, Reels and TikTok clips continue to outperform all other content formats by a factor of 3x on average engagement. New data points to interactive formats as the next evolution.",
    url: "#",
    relevanceScore: 91,
  },
  {
    id: 3,
    title: "Google's June Core Update Shakes SEO Rankings Across Content Sites",
    source: "Search Engine Journal",
    sourceInitial: "S",
    sourceColor: "#f59e0b",
    category: "SEO",
    publishedAt: "2026-06-28T14:30:00Z",
    readTime: 5,
    summary: "The latest Google core algorithm update has caused significant ranking volatility for content-heavy sites. Early analysis suggests that E-E-A-T signals and original reporting are gaining stronger weighting.",
    url: "#",
    relevanceScore: 82,
  },
  {
    id: 4,
    title: "Creator Economy Projected to Hit $500B as Brand Budgets Shift from TV",
    source: "Forbes",
    sourceInitial: "F",
    sourceColor: "#22c55e",
    category: "Creator Economy",
    publishedAt: "2026-06-28T10:00:00Z",
    readTime: 7,
    summary: "Brand advertising budgets continue to migrate from traditional television toward creator partnerships. Forbes analysis puts the total addressable creator economy at $500 billion by Q4 2026, driven by micro-influencer ROI.",
    url: "#",
    relevanceScore: 88,
  },
  {
    id: 5,
    title: "How AI Agents Are Automating Social Media Strategy for Lean Teams",
    source: "Wired",
    sourceInitial: "W",
    sourceColor: "#8b5cf6",
    category: "AI",
    publishedAt: "2026-06-27T16:45:00Z",
    readTime: 8,
    summary: "A new generation of AI agents can now draft content calendars, analyse competitor moves, and schedule posts autonomously. Wired spoke to five content teams using agentic tools to run entire channels with minimal human input.",
    url: "#",
    relevanceScore: 95,
  },
  {
    id: 6,
    title: "TikTok Introduces Subscription Tiers for Top Creators Globally",
    source: "Digiday",
    sourceInitial: "D",
    sourceColor: "#ec4899",
    category: "Platform Updates",
    publishedAt: "2026-06-27T09:00:00Z",
    readTime: 3,
    summary: "TikTok's paid subscription feature — previously in limited beta — is now available to any creator with over 10k followers. Monthly tiers range from $2.99 to $19.99 and unlock exclusive content feeds.",
    url: "#",
    relevanceScore: 79,
  },
  {
    id: 7,
    title: "Influencer Disclosure Rules Get Stricter: FTC Issues Updated Guidance",
    source: "Marketing Week",
    sourceInitial: "M",
    sourceColor: "#f59e0b",
    category: "Marketing",
    publishedAt: "2026-06-26T13:00:00Z",
    readTime: 5,
    summary: "The FTC has updated its endorsement guidelines, requiring paid partnerships to be disclosed in the first three seconds of video content and in visible text on static posts — not buried in hashtags.",
    url: "#",
    relevanceScore: 85,
  },
  {
    id: 8,
    title: "The Verge Breakdown: Which Platform Algorithm Actually Rewards Consistency?",
    source: "The Verge",
    sourceInitial: "V",
    sourceColor: "#3b82f6",
    category: "Social Media",
    publishedAt: "2026-06-26T08:30:00Z",
    readTime: 9,
    summary: "The Verge's six-month study across five platforms reveals that YouTube and Pinterest reward consistent posting frequency most, while Instagram's algorithm heavily prioritises recency and saves over follower count.",
    url: "#",
    relevanceScore: 90,
  },
  {
    id: 9,
    title: "How to Build a High-Converting Content Funnel in 2026",
    source: "HubSpot Blog",
    sourceInitial: "H",
    sourceColor: "#ef4444",
    category: "Marketing",
    publishedAt: "2026-06-25T11:00:00Z",
    readTime: 10,
    summary: "HubSpot's latest guide walks through building awareness-to-conversion content funnels using a mix of short-form video, long-form SEO articles, and email nurture sequences. Includes downloadable templates.",
    url: "#",
    relevanceScore: 76,
  },
  {
    id: 10,
    title: "Buffer's 2026 State of Social Media Report: Key Takeaways for Creators",
    source: "Buffer Blog",
    sourceInitial: "B",
    sourceColor: "#22c55e",
    category: "Creator Economy",
    publishedAt: "2026-06-24T09:00:00Z",
    readTime: 6,
    summary: "Buffer surveyed 7,000 creators and marketers for its annual report. Headline findings: 68% are using AI tools daily, LinkedIn is the biggest breakout platform of the year, and carousels remain the highest-saves format on Instagram.",
    url: "#",
    relevanceScore: 93,
  },
  {
    id: 11,
    title: "Later's Guide to the Best Posting Times on Every Platform — 2026 Edition",
    source: "Later Blog",
    sourceInitial: "L",
    sourceColor: "#8b5cf6",
    category: "Social Media",
    publishedAt: "2026-06-23T14:00:00Z",
    readTime: 4,
    summary: "Later analysed 50 million posts to update its posting-time recommendations. TikTok now peaks Tuesday and Thursday evenings; Instagram's sweet spot has shifted to 7–9am weekdays following its feed algorithm change.",
    url: "#",
    relevanceScore: 87,
  },
  {
    id: 12,
    title: "Hootsuite Benchmark: AI-Generated Content Performs On Par with Human-Written Posts",
    source: "Hootsuite",
    sourceInitial: "H",
    sourceColor: "#0ea5e9",
    category: "AI",
    publishedAt: "2026-06-22T10:30:00Z",
    readTime: 5,
    summary: "In a controlled study, Hootsuite found that AI-drafted social captions performed within 5% of human-written captions on engagement metrics — and outperformed them on click-through rate when paired with native imagery.",
    url: "#",
    relevanceScore: 89,
  },
];

const CATEGORIES: Array<"All" | Category> = [
  "All", "Marketing", "Social Media", "SEO", "AI", "Creator Economy", "Platform Updates",
];

const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  "Marketing":        { bg: "rgba(34,197,94,0.15)",   text: "#22c55e"  },
  "Social Media":     { bg: "rgba(59,130,246,0.15)",  text: "#3b82f6"  },
  "SEO":              { bg: "rgba(245,158,11,0.15)",  text: "#f59e0b"  },
  "AI":               { bg: "rgba(139,92,246,0.15)",  text: "#8b5cf6"  },
  "Creator Economy":  { bg: "rgba(236,72,153,0.15)",  text: "#ec4899"  },
  "Platform Updates": { bg: "rgba(239,68,68,0.15)",   text: "#ef4444"  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const now  = new Date("2026-06-29T12:00:00Z").getTime();
  const then = new Date(iso).getTime();
  const diff = now - then;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"latest" | "relevant">("latest");
  const [loading, setLoading] = useState(false);

  function handleRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  }

  const filtered = useMemo(() => {
    let list = ARTICLES;

    if (activeCategory !== "All") {
      list = list.filter(a => a.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
      );
    }

    if (sort === "latest") {
      list = [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
      list = [...list].sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    return list;
  }, [activeCategory, search, sort]);

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#0f0f11", color: "#f1f1f3" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, flex: 1 }}>News Consolidator</h1>
        <button
          onClick={handleRefresh}
          style={{
            background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "8px",
            color: "#f1f1f3", padding: "6px 14px", cursor: "pointer", fontSize: "13px",
            fontWeight: 500, display: "flex", alignItems: "center", gap: "6px",
          }}
        >
          <RefreshCw
            size={14}
            style={{
              animation: loading ? "spin 0.8s linear infinite" : "none",
            }}
          />
          Refresh
        </button>
      </div>

      {/* ── Category filter chips ── */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "5px 14px", borderRadius: "9999px", fontSize: "13px", fontWeight: 500,
                cursor: "pointer", border: "1px solid",
                background:   active ? "#8b5cf6" : "#1c1c24",
                borderColor:  active ? "#8b5cf6" : "#2a2a2e",
                color:        active ? "#ffffff"  : "#8b8b9a",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Search bar ── */}
      <div style={{ position: "relative", marginBottom: "14px" }}>
        <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8b8b9a", pointerEvents: "none" }} />
        <input
          type="text"
          placeholder="Search articles…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "8px",
            color: "#f1f1f3", fontSize: "14px", padding: "9px 12px 9px 36px",
            outline: "none",
          }}
        />
      </div>

      {/* ── Sort toggle ── */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
        {(["latest", "relevant"] as const).map(s => {
          const active = sort === s;
          return (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                padding: "5px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: 500,
                cursor: "pointer", border: "1px solid",
                background:  active ? "#1c1c24" : "transparent",
                borderColor: active ? "#2a2a2e" : "transparent",
                color:       active ? "#f1f1f3" : "#8b8b9a",
                transition: "all 0.15s",
              }}
            >
              {s === "latest" ? "Latest" : "Most Relevant"}
            </button>
          );
        })}
      </div>

      {/* ── Article grid (3-column) ── */}
      {filtered.length === 0 ? (
        <p style={{ color: "#8b8b9a", textAlign: "center", marginTop: "40px" }}>No articles match your filters.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          alignItems: "start",
        }}>
          {filtered.map(article => {
            const catStyle = CATEGORY_COLORS[article.category];
            return (
              <div
                key={article.id}
                style={{
                  background: "#1c1c24", border: "1px solid #2a2a2e",
                  borderRadius: "12px", padding: "16px",
                  display: "flex", flexDirection: "column", gap: "10px",
                }}
              >
                {/* Source row */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Favicon circle */}
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: article.sourceColor, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, flexShrink: 0,
                  }}>
                    {article.sourceInitial}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#f1f1f3", flex: 1 }}>{article.source}</span>
                  <span style={{ fontSize: "11px", color: "#8b8b9a" }}>{timeAgo(article.publishedAt)}</span>
                  <span style={{
                    fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px",
                    background: catStyle.bg, color: catStyle.text,
                  }}>
                    {article.category}
                  </span>
                </div>

                {/* Headline */}
                <p style={{
                  fontWeight: 600, fontSize: "14px", lineHeight: "1.45", margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {article.title}
                </p>

                {/* Summary */}
                <p style={{
                  fontSize: "13px", color: "#8b8b9a", lineHeight: "1.55", margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {article.summary}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#8b8b9a" }}>
                    <Clock size={12} />
                    {article.readTime} min read
                  </span>
                  <a
                    href={article.url}
                    style={{ fontSize: "12px", color: "#8b5cf6", fontWeight: 500, textDecoration: "none" }}
                  >
                    Read more →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Spin keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
