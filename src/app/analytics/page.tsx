"use client";

import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { TrendingUp, TrendingDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type DateRange = "7d" | "14d" | "30d" | "90d";

interface KpiData {
  label: string;
  values: Record<DateRange, { value: string; delta: string; up: boolean }>;
}

const KPI_DATA: KpiData[] = [
  {
    label: "Total Impressions",
    values: {
      "7d":  { value: "38,420",  delta: "+12.4%", up: true  },
      "14d": { value: "74,810",  delta: "+9.7%",  up: true  },
      "30d": { value: "142,830", delta: "+18.4%", up: true  },
      "90d": { value: "401,200", delta: "+22.1%", up: true  },
    },
  },
  {
    label: "Engagement Rate",
    values: {
      "7d":  { value: "5.8%", delta: "+0.6%", up: true  },
      "14d": { value: "5.4%", delta: "+0.3%", up: true  },
      "30d": { value: "5.2%", delta: "+0.8%", up: true  },
      "90d": { value: "4.9%", delta: "-0.2%", up: false },
    },
  },
  {
    label: "Follower Growth",
    values: {
      "7d":  { value: "+312",   delta: "+8.1%",  up: true  },
      "14d": { value: "+589",   delta: "+5.4%",  up: true  },
      "30d": { value: "+1,204", delta: "+14.2%", up: true  },
      "90d": { value: "+3,841", delta: "+31.7%", up: true  },
    },
  },
  {
    label: "Link Clicks",
    values: {
      "7d":  { value: "1,048", delta: "-2.1%", up: false },
      "14d": { value: "2,391", delta: "+4.8%", up: true  },
      "30d": { value: "4,918", delta: "-2.1%", up: false },
      "90d": { value: "13,204", delta: "+7.3%", up: true  },
    },
  },
];

function generateDates(days: number): string[] {
  const dates: string[] = [];
  const now = new Date("2026-06-29");
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  }
  return dates;
}

function seededRand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return Math.round(min + r * (max - min));
}

function generateSeries(days: number, base: number, variance: number, seedOffset: number): number[] {
  return Array.from({ length: days }, (_, i) => seededRand(i + seedOffset, base - variance, base + variance));
}

type PostTypeLabel = "Reels" | "Carousels" | "Singles" | "Stories";

const ENGAGEMENT_BY_TYPE: Record<PostTypeLabel, number> = {
  Reels: 7.2,
  Carousels: 5.8,
  Singles: 3.9,
  Stories: 4.4,
};

const TOP_POSTS = [
  { caption: "Summer Campaign Reel — golden hour BTS 🌅", type: "Reel", impressions: 28400, likes: 2041, engRate: "7.2%", date: "Jun 20, 2026" },
  { caption: "Product Tutorial: editing reels on mobile 📱", type: "Reel", impressions: 19850, likes: 1482, engRate: "7.5%", date: "Jun 25, 2026" },
  { caption: "5 morning habits carousel — save this! 📌", type: "Carousel", impressions: 17200, likes: 1107, engRate: "6.4%", date: "Jun 15, 2026" },
  { caption: "Behind the scenes story pack 🎬", type: "Story", impressions: 14200, likes: 823, engRate: "5.8%", date: "Jun 22, 2026" },
  { caption: "Summer lookbook swipe-through 🌊", type: "Carousel", impressions: 12930, likes: 744, engRate: "5.7%", date: "Jun 18, 2026" },
  { caption: "New limited edition drop reveal 🔥", type: "Single", impressions: 11730, likes: 576, engRate: "4.9%", date: "Jun 28, 2026" },
  { caption: "Weekly Q&A highlights + shoutouts 💬", type: "Story", impressions: 9610, likes: 423, engRate: "4.4%", date: "Jun 10, 2026" },
  { caption: "Brand refresh teaser — stay tuned 👀", type: "Single", impressions: 8840, likes: 345, engRate: "3.9%", date: "Jun 12, 2026" },
];

const TYPE_COLORS: Record<string, string> = {
  Reel: "#8b5cf6",
  Carousel: "#3b82f6",
  Single: "#22c55e",
  Story: "#f59e0b",
};

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#8b8b9a", boxWidth: 12, font: { size: 11 } },
    },
    tooltip: {
      backgroundColor: "#1c1c24",
      borderColor: "#2a2a2e",
      borderWidth: 1,
      titleColor: "#f1f1f3",
      bodyColor: "#8b8b9a",
    },
  },
  scales: {
    x: {
      ticks: { color: "#8b8b9a", font: { size: 10 } },
      grid: { color: "#2a2a2e" },
    },
    y: {
      ticks: { color: "#8b8b9a", font: { size: 10 } },
      grid: { color: "#2a2a2e" },
    },
  },
};

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("30d");
  const [fromDate, setFromDate] = useState("2026-06-01");
  const [toDate, setToDate] = useState("2026-06-29");

  const days = range === "7d" ? 7 : range === "14d" ? 14 : range === "30d" ? 30 : 90;
  const dates = useMemo(() => generateDates(days), [days]);

  const multiLineData = useMemo(() => ({
    labels: dates,
    datasets: [
      {
        label: "Instagram",
        data: generateSeries(days, 4200, 1400, 1),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139,92,246,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: days > 30 ? 0 : 3,
      },
      {
        label: "Facebook",
        data: generateSeries(days, 2800, 900, 100),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: days > 30 ? 0 : 3,
      },
      {
        label: "TikTok",
        data: generateSeries(days, 3600, 1200, 200),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: days > 30 ? 0 : 3,
      },
    ],
  }), [days, dates]);

  const engagementBarData = {
    labels: ["Reels", "Carousels", "Singles", "Stories"] as PostTypeLabel[],
    datasets: [
      {
        label: "Avg. Engagement Rate (%)",
        data: [
          ENGAGEMENT_BY_TYPE["Reels"],
          ENGAGEMENT_BY_TYPE["Carousels"],
          ENGAGEMENT_BY_TYPE["Singles"],
          ENGAGEMENT_BY_TYPE["Stories"],
        ],
        backgroundColor: ["#8b5cf6", "#3b82f6", "#22c55e", "#f59e0b"],
        borderRadius: 4,
      },
    ],
  };

  const followerDates = generateDates(14);
  const followerGrowthData = {
    labels: followerDates,
    datasets: [
      {
        label: "New Followers",
        data: generateSeries(14, 40, 25, 42),
        backgroundColor: "#8b5cf6",
        borderRadius: 4,
      },
    ],
  };

  const rangeButtons: DateRange[] = ["7d", "14d", "30d", "90d"];

  return (
    <div className="min-h-screen" style={{ color: "#f1f1f3" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "#f1f1f3" }}>Analytics</h1>
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ background: "#2a2a2e", color: "#8b8b9a", border: "1px solid #2a2a2e" }}
          >
            via Metricool
          </span>
        </div>

        {/* Date range controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {rangeButtons.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
              style={{
                background: range === r ? "#8b5cf6" : "#2a2a2e",
                color: range === r ? "#fff" : "#8b8b9a",
              }}
            >
              {r}
            </button>
          ))}
          <div className="flex items-center gap-1.5 ml-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-md px-2 py-1.5 text-xs outline-none"
              style={{ background: "#1c1c24", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
            />
            <span style={{ color: "#8b8b9a" }} className="text-xs">→</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-md px-2 py-1.5 text-xs outline-none"
              style={{ background: "#1c1c24", border: "1px solid #2a2a2e", color: "#f1f1f3" }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
        {KPI_DATA.map((kpi) => {
          const { value, delta, up } = kpi.values[range];
          return (
            <div
              key={kpi.label}
              className="rounded-xl p-4"
              style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
            >
              <p className="text-xs font-medium mb-3" style={{ color: "#8b8b9a" }}>{kpi.label}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: "#f1f1f3" }}>{value}</p>
              <p
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: up ? "#22c55e" : "#ef4444" }}
              >
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {delta} vs prev period
              </p>
            </div>
          );
        })}
      </div>

      {/* Multi-line chart — full width */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
      >
        <div className="mb-4">
          <p className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>Platform Impressions Over Time</p>
          <p className="text-xs mt-0.5" style={{ color: "#8b8b9a" }}>Instagram · Facebook · TikTok</p>
        </div>
        <div style={{ height: 240 }}>
          <Line
            data={multiLineData}
            options={{
              ...CHART_DEFAULTS,
              plugins: {
                ...CHART_DEFAULTS.plugins,
                legend: {
                  position: "top" as const,
                  labels: { color: "#8b8b9a", boxWidth: 12, font: { size: 11 } },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Two half-width bar charts */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <div
          className="rounded-xl p-5"
          style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
        >
          <div className="mb-4">
            <p className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>Engagement by Content Type</p>
            <p className="text-xs mt-0.5" style={{ color: "#8b8b9a" }}>Average engagement rate per format</p>
          </div>
          <div style={{ height: 200 }}>
            <Bar
              data={engagementBarData}
              options={{
                ...CHART_DEFAULTS,
                plugins: {
                  ...CHART_DEFAULTS.plugins,
                  legend: { display: false },
                },
                scales: {
                  ...CHART_DEFAULTS.scales,
                  y: {
                    ...CHART_DEFAULTS.scales.y,
                    ticks: {
                      ...CHART_DEFAULTS.scales.y.ticks,
                      callback: (value: number | string) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div
          className="rounded-xl p-5"
          style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
        >
          <div className="mb-4">
            <p className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>Daily Follower Growth</p>
            <p className="text-xs mt-0.5" style={{ color: "#8b8b9a" }}>New followers per day — last 14 days</p>
          </div>
          <div style={{ height: 200 }}>
            <Bar
              data={followerGrowthData}
              options={{
                ...CHART_DEFAULTS,
                plugins: {
                  ...CHART_DEFAULTS.plugins,
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top performing posts table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
      >
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #2a2a2e" }}>
          <p className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>Top Performing Posts</p>
          <p className="text-xs mt-0.5" style={{ color: "#8b8b9a" }}>Ranked by impressions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2e" }}>
                {["", "Caption", "Type", "Impressions", "Likes", "Eng. Rate", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium"
                    style={{ color: "#8b8b9a" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_POSTS.map((post, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: i < TOP_POSTS.length - 1 ? "1px solid #2a2a2e" : undefined }}
                >
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    <div
                      className="h-8 w-8 rounded-md flex-shrink-0"
                      style={{ background: TYPE_COLORS[post.type] + "33", border: `1px solid ${TYPE_COLORS[post.type]}55` }}
                    />
                  </td>
                  {/* Caption */}
                  <td className="px-4 py-3 max-w-xs">
                    <p
                      className="truncate"
                      style={{ color: "#f1f1f3", maxWidth: "200px" }}
                      title={post.caption}
                    >
                      {post.caption}
                    </p>
                  </td>
                  {/* Type badge */}
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: TYPE_COLORS[post.type] + "22",
                        color: TYPE_COLORS[post.type],
                        border: `1px solid ${TYPE_COLORS[post.type]}44`,
                      }}
                    >
                      {post.type}
                    </span>
                  </td>
                  {/* Impressions */}
                  <td className="px-4 py-3 font-medium tabular-nums" style={{ color: "#f1f1f3" }}>
                    {post.impressions.toLocaleString()}
                  </td>
                  {/* Likes */}
                  <td className="px-4 py-3 tabular-nums" style={{ color: "#8b8b9a" }}>
                    {post.likes.toLocaleString()}
                  </td>
                  {/* Eng. Rate */}
                  <td className="px-4 py-3 font-medium" style={{ color: "#22c55e" }}>
                    {post.engRate}
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3" style={{ color: "#8b8b9a" }}>
                    {post.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
