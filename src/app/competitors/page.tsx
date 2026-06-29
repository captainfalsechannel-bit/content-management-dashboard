"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = "instagram" | "youtube" | "tiktok" | "facebook" | "twitter";
type SortKey =
  | "name"
  | "followers"
  | "engagementRate"
  | "growth30d"
  | "postFrequency"
  | "lastPost";
type SortDir = "asc" | "desc";

interface RecentPost {
  caption: string;
  platform: Platform;
  likes: number;
  comments: number;
  engRate: number;
  daysAgo: number;
}

interface Competitor {
  id: string;
  name: string;
  niche: string;
  handles: Partial<Record<Platform, string>>;
  followersRaw: number;
  engagementRate: number;
  growth30dRaw: number;
  postFrequency: number;
  lastPostDaysAgo: number;
  sparkline: number[];
  recentPosts: RecentPost[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_COMPETITORS: Competitor[] = [
  {
    id: "1",
    name: "GlowLab",
    niche: "Beauty & Skincare",
    handles: { instagram: "@glowlab", youtube: "GlowLab", tiktok: "@glowlab" },
    followersRaw: 284000,
    engagementRate: 8.2,
    growth30dRaw: 12400,
    postFrequency: 9,
    lastPostDaysAgo: 0,
    sparkline: [18, 22, 19, 30, 28, 35, 41, 38],
    recentPosts: [
      { caption: "Morning skincare routine 🌿 #skincare", platform: "instagram", likes: 4200, comments: 198, engRate: 9.1, daysAgo: 1 },
      { caption: "Our new vitamin C serum drops Friday!", platform: "instagram", likes: 3800, comments: 241, engRate: 8.7, daysAgo: 3 },
      { caption: "Skincare mistakes you're probably making", platform: "youtube", likes: 12000, comments: 430, engRate: 7.4, daysAgo: 5 },
    ],
  },
  {
    id: "2",
    name: "FitForge",
    niche: "Fitness & Wellness",
    handles: { instagram: "@fitforge", tiktok: "@fitforge_official", youtube: "FitForge" },
    followersRaw: 1240000,
    engagementRate: 5.6,
    growth30dRaw: 31000,
    postFrequency: 14,
    lastPostDaysAgo: 0,
    sparkline: [60, 58, 72, 68, 80, 85, 90, 95],
    recentPosts: [
      { caption: "5-minute ab workout — no equipment needed", platform: "tiktok", likes: 89000, comments: 2100, engRate: 6.1, daysAgo: 0 },
      { caption: "What I eat in a day as a fitness coach", platform: "instagram", likes: 24000, comments: 980, engRate: 5.8, daysAgo: 2 },
    ],
  },
  {
    id: "3",
    name: "TechTalkDaily",
    niche: "Tech & Gadgets",
    handles: { youtube: "TechTalkDaily", twitter: "@techtalkdaily", instagram: "@techtalkdaily" },
    followersRaw: 892000,
    engagementRate: 3.4,
    growth30dRaw: -8200,
    postFrequency: 5,
    lastPostDaysAgo: 2,
    sparkline: [90, 88, 82, 78, 70, 65, 60, 58],
    recentPosts: [
      { caption: "Honest review: the new AI coding assistant everyone's talking about", platform: "youtube", likes: 18000, comments: 1200, engRate: 4.1, daysAgo: 2 },
      { caption: "Is the AR glasses era finally here?", platform: "twitter", likes: 3200, comments: 410, engRate: 2.8, daysAgo: 4 },
    ],
  },
  {
    id: "4",
    name: "WanderLux",
    niche: "Travel & Lifestyle",
    handles: { instagram: "@wanderlux", tiktok: "@wanderlux", facebook: "WanderLux" },
    followersRaw: 156000,
    engagementRate: 7.1,
    growth30dRaw: 5800,
    postFrequency: 7,
    lastPostDaysAgo: 1,
    sparkline: [20, 24, 22, 28, 33, 31, 38, 42],
    recentPosts: [
      { caption: "Hidden beach in Sardinia 🏖️ you need to visit", platform: "instagram", likes: 8900, comments: 312, engRate: 7.8, daysAgo: 1 },
      { caption: "Budget vs luxury hotel — same city", platform: "tiktok", likes: 62000, comments: 1800, engRate: 6.9, daysAgo: 3 },
    ],
  },
  {
    id: "5",
    name: "FoodieFrame",
    niche: "Food & Recipe",
    handles: { instagram: "@foodieframe", tiktok: "@foodieframe", youtube: "FoodieFrame", facebook: "FoodieFrame" },
    followersRaw: 478000,
    engagementRate: 9.4,
    growth30dRaw: 19600,
    postFrequency: 12,
    lastPostDaysAgo: 0,
    sparkline: [30, 38, 42, 50, 55, 62, 70, 78],
    recentPosts: [
      { caption: "This pasta takes 15 minutes and tastes like a restaurant made it", platform: "tiktok", likes: 145000, comments: 4200, engRate: 11.2, daysAgo: 0 },
      { caption: "Street food tour: Tokyo hidden gems 🍜", platform: "youtube", likes: 31000, comments: 1100, engRate: 8.6, daysAgo: 2 },
    ],
  },
  {
    id: "6",
    name: "MindfulMoments",
    niche: "Mental Health & Mindfulness",
    handles: { instagram: "@mindfulmoments", twitter: "@mindfulmoments", facebook: "MindfulMomentsPage" },
    followersRaw: 63000,
    engagementRate: 6.3,
    growth30dRaw: 2100,
    postFrequency: 6,
    lastPostDaysAgo: 3,
    sparkline: [10, 11, 13, 12, 15, 16, 18, 19],
    recentPosts: [
      { caption: "A 5-minute journaling prompt to reset your week", platform: "instagram", likes: 3100, comments: 287, engRate: 6.8, daysAgo: 3 },
      { caption: "Thread: 10 small habits that changed my mornings", platform: "twitter", likes: 4800, comments: 390, engRate: 5.9, daysAgo: 5 },
    ],
  },
];

const NICHES = ["Beauty & Skincare", "Fitness & Wellness", "Tech & Gadgets", "Travel & Lifestyle", "Food & Recipe", "Mental Health & Mindfulness", "Fashion", "Finance", "Gaming", "Education"];
const ALL_PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok", "facebook", "twitter"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatGrowth(n: number): string {
  const abs = Math.abs(n);
  const sign = n >= 0 ? "+" : "-";
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`;
  return `${sign}${abs}`;
}

function lastPostLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function engColor(rate: number): string {
  if (rate >= 7) return "#22c55e";
  if (rate >= 4) return "#f59e0b";
  return "#ef4444";
}

const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "#ec4899",
  youtube: "#ef4444",
  tiktok: "#f1f1f3",
  facebook: "#3b82f6",
  twitter: "#38bdf8",
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "IG",
  youtube: "YT",
  tiktok: "TK",
  facebook: "FB",
  twitter: "TW",
};

function PlatformDot({ platform }: { platform: Platform }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-[9px] font-bold w-5 h-5 shrink-0"
      style={{ backgroundColor: PLATFORM_COLORS[platform] + "30", color: PLATFORM_COLORS[platform], border: `1px solid ${PLATFORM_COLORS[platform]}50` }}
    >
      {PLATFORM_LABELS[platform]}
    </span>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 56;
  const h = 24;
  const step = w / (data.length - 1);
  const pts = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const last = data[data.length - 1];
  const first = data[0];
  const color = last >= first ? "#22c55e" : "#ef4444";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ col, active, dir }: { col: SortKey; active: SortKey; dir: SortDir }) {
  if (col !== active) return <ChevronsUpDown className="w-3 h-3 opacity-30" />;
  return dir === "asc" ? <ChevronUp className="w-3 h-3" style={{ color: "#8b5cf6" }} /> : <ChevronDown className="w-3 h-3" style={{ color: "#8b5cf6" }} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(INITIAL_COMPETITORS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("followers");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [activePlatforms, setActivePlatforms] = useState<Set<Platform>>(new Set(ALL_PLATFORMS));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", instagram: "", youtube: "", tiktok: "", niche: NICHES[0] });

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  function togglePlatform(p: Platform) {
    setActivePlatforms(prev => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  }

  function deleteCompetitor(id: string) {
    setCompetitors(c => c.filter(x => x.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function addCompetitor() {
    if (!form.name.trim()) return;
    const handles: Partial<Record<Platform, string>> = {};
    if (form.instagram) handles.instagram = form.instagram;
    if (form.youtube) handles.youtube = form.youtube;
    if (form.tiktok) handles.tiktok = form.tiktok;
    const newComp: Competitor = {
      id: Date.now().toString(),
      name: form.name,
      niche: form.niche,
      handles,
      followersRaw: Math.floor(Math.random() * 200000) + 10000,
      engagementRate: Math.round((Math.random() * 8 + 2) * 10) / 10,
      growth30dRaw: Math.floor((Math.random() - 0.3) * 20000),
      postFrequency: Math.floor(Math.random() * 10) + 2,
      lastPostDaysAgo: Math.floor(Math.random() * 7),
      sparkline: Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 10),
      recentPosts: [],
    };
    setCompetitors(c => [...c, newComp]);
    setForm({ name: "", instagram: "", youtube: "", tiktok: "", niche: NICHES[0] });
    setShowForm(false);
  }

  const filtered = useMemo(() => {
    return competitors.filter(c =>
      Object.keys(c.handles).some(p => activePlatforms.has(p as Platform))
    );
  }, [competitors, activePlatforms]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = 0, bv = 0;
      switch (sortKey) {
        case "name": return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case "followers": av = a.followersRaw; bv = b.followersRaw; break;
        case "engagementRate": av = a.engagementRate; bv = b.engagementRate; break;
        case "growth30d": av = a.growth30dRaw; bv = b.growth30dRaw; break;
        case "postFrequency": av = a.postFrequency; bv = b.postFrequency; break;
        case "lastPost": av = -a.lastPostDaysAgo; bv = -b.lastPostDaysAgo; break;
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [filtered, sortKey, sortDir]);

  const thClass = "px-3 py-3 text-left text-xs font-medium text-[#8b8b9a] uppercase tracking-wider cursor-pointer select-none hover:text-[#f1f1f3] transition-colors";
  const thActive = "text-[#8b5cf6]";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0f11", color: "#f1f1f3" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Competitor Tracker</h1>
          <p className="text-sm mt-1" style={{ color: "#8b8b9a" }}>Monitor competitor performance and benchmark your metrics.</p>
        </div>
        <Button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#8b5cf6", color: "#fff" }}
        >
          <Plus className="w-4 h-4" />
          Add Competitor
        </Button>
      </div>

      {/* Add competitor form */}
      {showForm && (
        <div className="rounded-xl border mb-6 p-4" style={{ backgroundColor: "#1c1c24", borderColor: "#2a2a2e" }}>
          <h2 className="text-sm font-semibold mb-4">New Competitor</h2>
          <div className="grid grid-cols-2 gap-3 mb-4 md:grid-cols-5">
            <input
              className="rounded-lg px-3 py-2 text-sm outline-none col-span-2 md:col-span-1"
              style={{ backgroundColor: "#0f0f11", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
              placeholder="Name *"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <input
              className="rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "#0f0f11", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
              placeholder="@instagram"
              value={form.instagram}
              onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
            />
            <input
              className="rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "#0f0f11", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
              placeholder="YouTube channel"
              value={form.youtube}
              onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))}
            />
            <input
              className="rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "#0f0f11", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
              placeholder="@tiktok"
              value={form.tiktok}
              onChange={e => setForm(f => ({ ...f, tiktok: e.target.value }))}
            />
            <select
              className="rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "#0f0f11", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
              value={form.niche}
              onChange={e => setForm(f => ({ ...f, niche: e.target.value }))}
            >
              {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addCompetitor}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#8b5cf6", color: "#fff" }}
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#2a2a2e", color: "#8b8b9a" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Platform filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs mr-1" style={{ color: "#8b8b9a" }}>Filter:</span>
        {ALL_PLATFORMS.map(p => (
          <button
            key={p}
            onClick={() => togglePlatform(p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: activePlatforms.has(p) ? PLATFORM_COLORS[p] + "20" : "#1c1c24",
              border: `1px solid ${activePlatforms.has(p) ? PLATFORM_COLORS[p] + "60" : "#2a2a2e"}`,
              color: activePlatforms.has(p) ? PLATFORM_COLORS[p] : "#8b8b9a",
              opacity: activePlatforms.has(p) ? 1 : 0.5,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[p] }} />
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "#1c1c24", borderColor: "#2a2a2e" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead style={{ borderBottom: "1px solid #2a2a2e" }}>
              <tr>
                <th className={`${thClass} ${sortKey === "name" ? thActive : ""}`} onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">Competitor <SortIcon col="name" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={thClass}>Platforms</th>
                <th className={`${thClass} ${sortKey === "followers" ? thActive : ""}`} onClick={() => handleSort("followers")}>
                  <span className="flex items-center gap-1">Followers <SortIcon col="followers" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={`${thClass} ${sortKey === "engagementRate" ? thActive : ""}`} onClick={() => handleSort("engagementRate")}>
                  <span className="flex items-center gap-1">Eng. Rate <SortIcon col="engagementRate" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={`${thClass} ${sortKey === "growth30d" ? thActive : ""}`} onClick={() => handleSort("growth30d")}>
                  <span className="flex items-center gap-1">30d Growth <SortIcon col="growth30d" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={`${thClass} ${sortKey === "postFrequency" ? thActive : ""}`} onClick={() => handleSort("postFrequency")}>
                  <span className="flex items-center gap-1">Frequency <SortIcon col="postFrequency" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={thClass}>Trend</th>
                <th className={`${thClass} ${sortKey === "lastPost" ? thActive : ""}`} onClick={() => handleSort("lastPost")}>
                  <span className="flex items-center gap-1">Last Post <SortIcon col="lastPost" active={sortKey} dir={sortDir} /></span>
                </th>
                <th className={thClass}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#2a2a2e" }}>
              {sorted.map(comp => (
                <>
                  <tr
                    key={comp.id}
                    className="transition-colors"
                    style={{ borderColor: "#2a2a2e" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#ffffff08")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
                  >
                    {/* Competitor */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ backgroundColor: "#8b5cf620", color: "#8b5cf6", border: "1px solid #8b5cf640" }}
                        >
                          {comp.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{comp.name}</div>
                          <div className="text-xs truncate" style={{ color: "#8b8b9a" }}>{comp.niche}</div>
                        </div>
                      </div>
                    </td>

                    {/* Platforms */}
                    <td className="px-3 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {(Object.keys(comp.handles) as Platform[]).map(p => (
                          <PlatformDot key={p} platform={p} />
                        ))}
                      </div>
                    </td>

                    {/* Followers */}
                    <td className="px-3 py-3 text-sm font-semibold tabular-nums">
                      {formatFollowers(comp.followersRaw)}
                    </td>

                    {/* Engagement rate */}
                    <td className="px-3 py-3">
                      <span className="text-sm font-semibold tabular-nums" style={{ color: engColor(comp.engagementRate) }}>
                        {comp.engagementRate.toFixed(1)}%
                      </span>
                    </td>

                    {/* 30d growth */}
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1 text-sm tabular-nums"
                        style={{ color: comp.growth30dRaw >= 0 ? "#22c55e" : "#ef4444" }}>
                        {comp.growth30dRaw >= 0
                          ? <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                          : <TrendingDown className="w-3.5 h-3.5 shrink-0" />}
                        {formatGrowth(comp.growth30dRaw)}
                      </span>
                    </td>

                    {/* Post frequency */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#2a2a2e" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${Math.min(100, (comp.postFrequency / 14) * 100)}%`, backgroundColor: "#8b5cf6" }}
                          />
                        </div>
                        <span className="text-xs tabular-nums" style={{ color: "#8b8b9a" }}>{comp.postFrequency}/wk</span>
                      </div>
                    </td>

                    {/* Sparkline */}
                    <td className="px-3 py-3">
                      <Sparkline data={comp.sparkline} />
                    </td>

                    {/* Last post */}
                    <td className="px-3 py-3 text-sm tabular-nums" style={{ color: comp.lastPostDaysAgo <= 1 ? "#22c55e" : "#8b8b9a" }}>
                      {lastPostLabel(comp.lastPostDaysAgo)}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
                          className="p-1.5 rounded-md transition-colors hover:bg-white/10"
                          title="Expand"
                        >
                          {expandedId === comp.id
                            ? <ChevronUp className="w-4 h-4" style={{ color: "#8b5cf6" }} />
                            : <ChevronDown className="w-4 h-4" style={{ color: "#8b8b9a" }} />}
                        </button>
                        <button
                          onClick={() => deleteCompetitor(comp.id)}
                          className="p-1.5 rounded-md transition-colors hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {expandedId === comp.id && (
                    <tr key={`${comp.id}-detail`} style={{ borderColor: "#2a2a2e" }}>
                      <td colSpan={9} className="px-4 py-4" style={{ backgroundColor: "#13131a" }}>
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          {[
                            { label: "Total Followers", value: formatFollowers(comp.followersRaw) },
                            { label: "Eng. Rate", value: `${comp.engagementRate.toFixed(1)}%` },
                            { label: "30d Growth", value: formatGrowth(comp.growth30dRaw) },
                            { label: "Posts/Week", value: `${comp.postFrequency}` },
                          ].map(stat => (
                            <div key={stat.label} className="rounded-lg p-3" style={{ backgroundColor: "#1c1c24", border: "1px solid #2a2a2e" }}>
                              <div className="text-xs mb-1" style={{ color: "#8b8b9a" }}>{stat.label}</div>
                              <div className="text-xl font-bold">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        {comp.recentPosts.length > 0 && (
                          <>
                            <div className="text-xs font-medium mb-2" style={{ color: "#8b8b9a" }}>RECENT POSTS</div>
                            <div className="space-y-2">
                              {comp.recentPosts.map((post, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "#1c1c24", border: "1px solid #2a2a2e" }}>
                                  <PlatformDot platform={post.platform} />
                                  <span className="flex-1 text-sm truncate">{post.caption}</span>
                                  <span className="text-xs tabular-nums" style={{ color: "#8b8b9a" }}>❤ {post.likes.toLocaleString()}</span>
                                  <span className="text-xs tabular-nums" style={{ color: "#8b8b9a" }}>💬 {post.comments.toLocaleString()}</span>
                                  <span className="text-xs font-semibold tabular-nums" style={{ color: engColor(post.engRate) }}>{post.engRate.toFixed(1)}%</span>
                                  <span className="text-xs" style={{ color: "#8b8b9a" }}>{lastPostLabel(post.daysAgo)}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
