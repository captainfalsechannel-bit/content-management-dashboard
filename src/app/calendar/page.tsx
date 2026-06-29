"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform = "Instagram" | "YouTube" | "TikTok" | "Facebook" | "Twitter";
type Status = "Published" | "Scheduled" | "Draft";

interface Post {
  id: number;
  date: string; // YYYY-MM-DD
  time: string;
  platform: Platform;
  caption: string;
  type: string;
  status: Status;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const POSTS: Post[] = [
  // Published (past)
  { id: 1,  date: "2026-06-01", time: "9:00 AM",  platform: "Instagram", caption: "Morning routine that changed my life ✨", type: "Reel",     status: "Published" },
  { id: 2,  date: "2026-06-02", time: "12:00 PM", platform: "TikTok",   caption: "5 productivity hacks you need rn",     type: "Video",    status: "Published" },
  { id: 3,  date: "2026-06-03", time: "3:00 PM",  platform: "Twitter",  caption: "Hot take: consistency beats creativity",type: "Tweet",    status: "Published" },
  { id: 4,  date: "2026-06-05", time: "10:00 AM", platform: "Facebook", caption: "Behind the scenes of our studio setup", type: "Post",     status: "Published" },
  { id: 5,  date: "2026-06-07", time: "8:00 AM",  platform: "YouTube",  caption: "Full day in my life as a creator",     type: "Video",    status: "Published" },
  { id: 6,  date: "2026-06-09", time: "2:00 PM",  platform: "Instagram", caption: "Summer capsule wardrobe essentials",  type: "Carousel", status: "Published" },
  { id: 7,  date: "2026-06-10", time: "11:00 AM", platform: "TikTok",   caption: "This trend is taking over #fyp",       type: "Video",    status: "Published" },
  { id: 8,  date: "2026-06-12", time: "5:00 PM",  platform: "Twitter",  caption: "Unpopular opinion about personal brand", type: "Tweet",  status: "Published" },
  { id: 9,  date: "2026-06-14", time: "9:00 AM",  platform: "Instagram", caption: "Golden hour in Malibu 🌅",            type: "Post",     status: "Published" },
  { id: 10, date: "2026-06-16", time: "10:30 AM", platform: "YouTube",  caption: "How I grew to 100k subscribers",      type: "Video",    status: "Published" },
  { id: 11, date: "2026-06-18", time: "12:00 PM", platform: "Facebook", caption: "Community Q&A — your questions answered", type: "Live", status: "Published" },
  { id: 12, date: "2026-06-20", time: "8:00 AM",  platform: "Instagram", caption: "Monday motivation: start before ready", type: "Reel",   status: "Published" },
  { id: 13, date: "2026-06-22", time: "4:00 PM",  platform: "TikTok",   caption: "POV: you finally nail your niche",    type: "Video",    status: "Published" },
  { id: 14, date: "2026-06-24", time: "11:00 AM", platform: "Twitter",  caption: "Threads vs Twitter — my honest take", type: "Tweet",    status: "Published" },
  // Today / near future — Scheduled
  { id: 15, date: "2026-06-29", time: "9:00 AM",  platform: "Instagram", caption: "Mid-year goals check-in 🎯",          type: "Carousel", status: "Scheduled" },
  { id: 16, date: "2026-06-29", time: "3:00 PM",  platform: "TikTok",   caption: "Packing for my summer trip ☀️",       type: "Video",    status: "Scheduled" },
  { id: 17, date: "2026-06-30", time: "10:00 AM", platform: "YouTube",  caption: "My June favourites + big announcement", type: "Video",  status: "Scheduled" },
  // Far future — Draft
  { id: 18, date: "2026-07-01", time: "8:00 AM",  platform: "Instagram", caption: "July content series launch",          type: "Reel",     status: "Draft" },
  { id: 19, date: "2026-07-04", time: "12:00 PM", platform: "Facebook", caption: "Independence Day celebration post",   type: "Post",     status: "Draft" },
  { id: 20, date: "2026-07-07", time: "9:00 AM",  platform: "Twitter",  caption: "Lessons from 6 months of creating",  type: "Tweet",    status: "Draft" },
];

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORM_CONFIG: Record<Platform, { dot: string; label: string }> = {
  Instagram: { dot: "#ec4899", label: "Instagram" },
  YouTube:   { dot: "#ef4444", label: "YouTube"   },
  TikTok:    { dot: "#f1f1f3", label: "TikTok"    },
  Facebook:  { dot: "#3b82f6", label: "Facebook"  },
  Twitter:   { dot: "#0ea5e9", label: "Twitter/X" },
};

const ALL_PLATFORMS: Platform[] = ["Instagram", "YouTube", "TikTok", "Facebook", "Twitter"];

// ─── Status chip styles ───────────────────────────────────────────────────────

const STATUS_CHIP: Record<Status, { bg: string; text: string }> = {
  Scheduled: { bg: "rgba(139,92,246,0.18)", text: "#8b5cf6" },
  Published: { bg: "rgba(34,197,94,0.18)",  text: "#22c55e" },
  Draft:     { bg: "rgba(245,158,11,0.18)", text: "#f59e0b" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function todayIso() {
  // App date: 2026-06-29
  return "2026-06-29";
}

function formatDetailHeading(date: Date) {
  return `${DAYS_OF_WEEK[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const TODAY = todayIso();

  // Current view month
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 5, 1)); // June 2026
  const [selectedDay, setSelectedDay] = useState<string | null>(TODAY);
  const [activePlatforms, setActivePlatforms] = useState<Set<Platform>>(
    new Set(ALL_PLATFORMS)
  );

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth     = new Date(year, month + 1, 0).getDate();

  // Navigate months
  function prevMonth() { setViewDate(new Date(year, month - 1, 1)); setSelectedDay(null); }
  function nextMonth() { setViewDate(new Date(year, month + 1, 1)); setSelectedDay(null); }
  function goToday()   { setViewDate(new Date(2026, 5, 1)); setSelectedDay(TODAY); }

  // Toggle platform
  function togglePlatform(p: Platform) {
    setActivePlatforms(prev => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p); else next.add(p);
      return next;
    });
  }

  // Filter posts visible for this view
  function postsForDay(dateStr: string) {
    return POSTS.filter(p => p.date === dateStr && activePlatforms.has(p.platform));
  }

  // Build calendar grid cells: null = empty leading/trailing
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  // Detail panel posts
  const detailPosts = selectedDay
    ? POSTS.filter(p => p.date === selectedDay && activePlatforms.has(p.platform))
    : [];
  const detailDate = selectedDay ? new Date(selectedDay + "T12:00:00") : null;

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#0f0f11", color: "#f1f1f3" }}>

      {/* ── Month navigation ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, flex: 1 }}>Content Calendar</h1>
        <button
          onClick={prevMonth}
          style={{ background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "6px", color: "#f1f1f3", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontWeight: 600, fontSize: "16px", minWidth: "140px", textAlign: "center" }}>
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{ background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "6px", color: "#f1f1f3", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={goToday}
          style={{ background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "6px", color: "#f1f1f3", padding: "6px 14px", cursor: "pointer", fontSize: "13px", fontWeight: 500 }}
        >
          Today
        </button>
      </div>

      {/* ── Platform filter pills ── */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {ALL_PLATFORMS.map(p => {
          const cfg = PLATFORM_CONFIG[p];
          const active = activePlatforms.has(p);
          return (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: active ? "#1c1c24" : "transparent",
                border: `1px solid ${active ? "#2a2a2e" : "#2a2a2e"}`,
                borderRadius: "9999px",
                padding: "4px 12px",
                cursor: "pointer",
                color: "#f1f1f3",
                fontSize: "13px",
                fontWeight: 500,
                opacity: active ? 1 : 0.4,
                transition: "opacity 0.15s",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, display: "inline-block", flexShrink: 0 }} />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* ── Calendar grid ── */}
      <div style={{ background: "#1c1c24", border: "1px solid #2a2a2e", borderRadius: "12px", overflow: "hidden" }}>
        {/* Day-of-week headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #2a2a2e" }}>
          {DAYS_OF_WEEK.map(d => (
            <div key={d} style={{ textAlign: "center", padding: "10px 4px", fontSize: "12px", fontWeight: 600, color: "#8b8b9a" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar rows */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {cells.map((day, idx) => {
            if (!day) {
              return (
                <div key={`empty-${idx}`} style={{ minHeight: "100px", borderRight: idx % 7 !== 6 ? "1px solid #2a2a2e" : "none", borderBottom: "1px solid #2a2a2e" }} />
              );
            }

            const dateStr = isoDate(year, month, day);
            const isToday = dateStr === TODAY;
            const isPast  = dateStr < TODAY;
            const isSelected = dateStr === selectedDay;
            const dayPosts = postsForDay(dateStr);
            const visiblePosts = dayPosts.slice(0, 3);
            const overflow = dayPosts.length - 3;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                style={{
                  minHeight: "100px",
                  padding: "8px",
                  borderRight: idx % 7 !== 6 ? "1px solid #2a2a2e" : "none",
                  borderBottom: "1px solid #2a2a2e",
                  cursor: "pointer",
                  opacity: isPast && !isToday ? 0.6 : 1,
                  background: isSelected ? "rgba(139,92,246,0.08)" : isToday ? "rgba(139,92,246,0.05)" : "transparent",
                  outline: isToday ? "2px solid #8b5cf6" : isSelected ? "2px solid rgba(139,92,246,0.5)" : "none",
                  outlineOffset: "-2px",
                  transition: "background 0.1s",
                }}
              >
                <div style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  marginBottom: "4px",
                  color: isToday ? "#8b5cf6" : "#f1f1f3",
                  width: "22px", height: "22px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  background: isToday ? "rgba(139,92,246,0.18)" : "transparent",
                }}>
                  {day}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {visiblePosts.map(post => {
                    const s = STATUS_CHIP[post.status];
                    const dot = PLATFORM_CONFIG[post.platform].dot;
                    return (
                      <div
                        key={post.id}
                        style={{
                          display: "flex", alignItems: "center", gap: "4px",
                          background: s.bg, color: s.text,
                          borderRadius: "4px", padding: "2px 5px",
                          fontSize: "10px", fontWeight: 500,
                          overflow: "hidden",
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {post.caption.length > 20 ? post.caption.slice(0, 20) + "…" : post.caption}
                        </span>
                      </div>
                    );
                  })}
                  {overflow > 0 && (
                    <div style={{ fontSize: "10px", color: "#8b8b9a", paddingLeft: "4px" }}>+{overflow} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selectedDay && detailDate && (
        <div style={{
          marginTop: "20px",
          background: "#1c1c24",
          border: "1px solid #2a2a2e",
          borderRadius: "12px",
          padding: "20px",
        }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px", color: "#f1f1f3" }}>
            Posts for {formatDetailHeading(detailDate)}
          </h2>
          {detailPosts.length === 0 ? (
            <p style={{ color: "#8b8b9a", fontSize: "14px" }}>No posts scheduled for this day.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {detailPosts.map(post => {
                const s = STATUS_CHIP[post.status];
                const dot = PLATFORM_CONFIG[post.platform].dot;
                return (
                  <div key={post.id} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "#0f0f11", border: "1px solid #2a2a2e",
                    borderRadius: "8px", padding: "12px 14px",
                  }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 500, fontSize: "14px", color: "#f1f1f3", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {post.caption}
                      </p>
                      <p style={{ fontSize: "12px", color: "#8b8b9a", margin: "2px 0 0 0" }}>
                        {post.platform} · {post.time}
                      </p>
                    </div>
                    <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "rgba(139,92,246,0.12)", color: "#8b5cf6", fontWeight: 500, flexShrink: 0 }}>
                      {post.type}
                    </span>
                    <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: s.bg, color: s.text, fontWeight: 500, flexShrink: 0 }}>
                      {post.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
