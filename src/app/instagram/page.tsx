"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type PostType = "Reel" | "Carousel" | "Single" | "Story";
type PostStatus = "Scheduled" | "Drafts" | "Published" | "Backlog";

interface Post {
  id: number;
  caption: string;
  type: PostType;
  status: PostStatus;
  scheduledDate: string;
}

const TYPE_STYLES: Record<PostType, { gradient: string; badge: string }> = {
  Reel: {
    gradient: "bg-gradient-to-br from-purple-900 to-purple-700",
    badge: "bg-purple-600 text-white border-transparent",
  },
  Carousel: {
    gradient: "bg-gradient-to-br from-blue-900 to-blue-700",
    badge: "bg-blue-600 text-white border-transparent",
  },
  Single: {
    gradient: "bg-gradient-to-br from-green-900 to-green-700",
    badge: "bg-green-700 text-white border-transparent",
  },
  Story: {
    gradient: "bg-gradient-to-br from-amber-900 to-amber-700",
    badge: "bg-amber-600 text-white border-transparent",
  },
};

const COLUMN_ORDER: PostStatus[] = ["Scheduled", "Drafts", "Published", "Backlog"];

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    caption: "Golden hour at the studio — new collection dropping this Friday! ✨ Don't miss it.",
    type: "Reel",
    status: "Scheduled",
    scheduledDate: "2026-07-04",
  },
  {
    id: 2,
    caption: "Swipe through our summer lookbook and tell us your favorite style combo 🌊",
    type: "Carousel",
    status: "Scheduled",
    scheduledDate: "2026-07-06",
  },
  {
    id: 3,
    caption: "Behind the scenes of the campaign shoot — the bloopers are gold 😂🎬",
    type: "Story",
    status: "Scheduled",
    scheduledDate: "2026-07-08",
  },
  {
    id: 4,
    caption: "Working on something big. Stay tuned for a major announcement next week 👀",
    type: "Reel",
    status: "Drafts",
    scheduledDate: "2026-07-10",
  },
  {
    id: 5,
    caption: "5 morning habits that transformed my productivity — a thread you need to save 📌",
    type: "Carousel",
    status: "Drafts",
    scheduledDate: "2026-07-12",
  },
  {
    id: 6,
    caption: "Summer vibes are immaculate this year ☀️ #ContentCreator #Lifestyle",
    type: "Single",
    status: "Published",
    scheduledDate: "2026-06-20",
  },
  {
    id: 7,
    caption: "Tutorial: How we edit our reels from scratch using only a phone 📱✂️",
    type: "Reel",
    status: "Published",
    scheduledDate: "2026-06-25",
  },
  {
    id: 8,
    caption: "Product spotlight: the new limited edition drop everyone is talking about 🔥",
    type: "Single",
    status: "Published",
    scheduledDate: "2026-06-28",
  },
  {
    id: 9,
    caption: "Collab ideas with local creators — brainstorming session notes",
    type: "Carousel",
    status: "Backlog",
    scheduledDate: "2026-08-01",
  },
  {
    id: 10,
    caption: "Q3 brand refresh reveal — teaser content for the rebrand campaign",
    type: "Story",
    status: "Backlog",
    scheduledDate: "2026-08-15",
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface ModalState {
  open: boolean;
  editingId: number | null;
  caption: string;
  type: PostType;
  status: PostStatus;
  scheduledDate: string;
}

const EMPTY_MODAL: ModalState = {
  open: false,
  editingId: null,
  caption: "",
  type: "Reel",
  status: "Scheduled",
  scheduledDate: new Date().toISOString().slice(0, 10),
};

export default function InstagramPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [nextId, setNextId] = useState<number>(INITIAL_POSTS.length + 1);
  const [modal, setModal] = useState<ModalState>(EMPTY_MODAL);

  const openNew = () =>
    setModal({ ...EMPTY_MODAL, open: true });

  const openEdit = (post: Post) =>
    setModal({
      open: true,
      editingId: post.id,
      caption: post.caption,
      type: post.type,
      status: post.status,
      scheduledDate: post.scheduledDate,
    });

  const closeModal = () => setModal(EMPTY_MODAL);

  const savePost = () => {
    if (!modal.caption.trim()) return;
    if (modal.editingId !== null) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === modal.editingId
            ? { ...p, caption: modal.caption, type: modal.type, status: modal.status, scheduledDate: modal.scheduledDate }
            : p
        )
      );
    } else {
      const newPost: Post = {
        id: nextId,
        caption: modal.caption,
        type: modal.type,
        status: modal.status,
        scheduledDate: modal.scheduledDate,
      };
      setPosts((prev) => [...prev, newPost]);
      setNextId((n) => n + 1);
    }
    closeModal();
  };

  const deletePost = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const columnPosts = (status: PostStatus) => posts.filter((p) => p.status === status);

  const counts: Record<PostStatus, number> = {
    Scheduled: columnPosts("Scheduled").length,
    Drafts: columnPosts("Drafts").length,
    Published: columnPosts("Published").length,
    Backlog: columnPosts("Backlog").length,
  };

  const statPillColors: Record<PostStatus, string> = {
    Scheduled: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    Drafts: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    Published: "bg-green-500/15 text-green-400 border border-green-500/30",
    Backlog: "bg-[#2a2a2e] text-[#8b8b9a] border border-[#2a2a2e]",
  };

  return (
    <div className="min-h-screen" style={{ color: "#f1f1f3" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#f1f1f3" }}>Instagram Manager</h1>
          <p className="mt-1 text-sm" style={{ color: "#8b8b9a" }}>Schedule, draft, and manage your Instagram content.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{ background: "#8b5cf6" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#7c3aed")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#8b5cf6")}
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {COLUMN_ORDER.map((status) => (
          <span key={status} className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${statPillColors[status]}`}>
            {status}
            <span className="inline-flex items-center justify-center rounded-full w-5 h-5 text-xs font-bold" style={{ background: "rgba(255,255,255,0.08)" }}>
              {counts[status]}
            </span>
          </span>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMN_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            posts={columnPosts(status)}
            onEdit={openEdit}
            onDelete={deletePost}
            onAddPost={() => setModal({ ...EMPTY_MODAL, open: true, status })}
          />
        ))}
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="w-full max-w-md rounded-xl shadow-2xl p-6"
            style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold" style={{ color: "#f1f1f3" }}>
                {modal.editingId !== null ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-md p-1 transition-colors hover:bg-white/10"
                style={{ color: "#8b8b9a" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8b9a" }}>Caption</label>
                <textarea
                  rows={4}
                  value={modal.caption}
                  onChange={(e) => setModal((m) => ({ ...m, caption: e.target.value }))}
                  placeholder="Write your caption..."
                  className="w-full rounded-md px-3 py-2 text-sm resize-none outline-none transition-colors"
                  style={{
                    background: "#0f0f11",
                    border: "1px solid #2a2a2e",
                    color: "#f1f1f3",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8b9a" }}>Post Type</label>
                  <select
                    value={modal.type}
                    onChange={(e) => setModal((m) => ({ ...m, type: e.target.value as PostType }))}
                    className="w-full rounded-md px-3 py-2 text-sm outline-none"
                    style={{
                      background: "#0f0f11",
                      border: "1px solid #2a2a2e",
                      color: "#f1f1f3",
                    }}
                  >
                    {(["Reel", "Carousel", "Single", "Story"] as PostType[]).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8b9a" }}>Status</label>
                  <select
                    value={modal.status}
                    onChange={(e) => setModal((m) => ({ ...m, status: e.target.value as PostStatus }))}
                    className="w-full rounded-md px-3 py-2 text-sm outline-none"
                    style={{
                      background: "#0f0f11",
                      border: "1px solid #2a2a2e",
                      color: "#f1f1f3",
                    }}
                  >
                    {(["Scheduled", "Drafts", "Published", "Backlog"] as PostStatus[]).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8b9a" }}>Scheduled Date</label>
                <input
                  type="date"
                  value={modal.scheduledDate}
                  onChange={(e) => setModal((m) => ({ ...m, scheduledDate: e.target.value }))}
                  className="w-full rounded-md px-3 py-2 text-sm outline-none"
                  style={{
                    background: "#0f0f11",
                    border: "1px solid #2a2a2e",
                    color: "#f1f1f3",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                style={{ background: "#2a2a2e", color: "#8b8b9a" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333340")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2a2a2e")}
              >
                Cancel
              </button>
              <button
                onClick={savePost}
                className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                style={{ background: "#8b5cf6" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#7c3aed")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#8b5cf6")}
              >
                {modal.editingId !== null ? "Save Changes" : "Add Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface KanbanColumnProps {
  status: PostStatus;
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onAddPost: () => void;
}

const COLUMN_HEADER_COLORS: Record<PostStatus, string> = {
  Scheduled: "#3b82f6",
  Drafts: "#f59e0b",
  Published: "#22c55e",
  Backlog: "#8b8b9a",
};

function KanbanColumn({ status, posts, onEdit, onDelete, onAddPost }: KanbanColumnProps) {
  return (
    <div className="flex flex-col rounded-xl" style={{ background: "#13131a", border: "1px solid #2a2a2e" }}>
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #2a2a2e" }}>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: COLUMN_HEADER_COLORS[status] }}
          />
          <span className="text-sm font-semibold" style={{ color: "#f1f1f3" }}>{status}</span>
        </div>
        <span
          className="inline-flex items-center justify-center rounded-full w-5 h-5 text-xs font-bold"
          style={{ background: "#2a2a2e", color: "#8b8b9a" }}
        >
          {posts.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 p-3 flex-1">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {/* Add Post button */}
      <div className="p-3 pt-0">
        <button
          onClick={onAddPost}
          className="w-full flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors"
          style={{ color: "#8b8b9a", border: "1px dashed #2a2a2e" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f1f1f3";
            e.currentTarget.style.borderColor = "#8b8b9a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#8b8b9a";
            e.currentTarget.style.borderColor = "#2a2a2e";
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Post
        </button>
      </div>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const styles = TYPE_STYLES[post.type];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: "#1c1c24", border: "1px solid #2a2a2e" }}
    >
      {/* Thumbnail */}
      <div className={`h-20 w-full ${styles.gradient} flex items-end p-2`}>
        <span
          className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold border ${styles.badge}`}
        >
          {post.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <p
          className="text-xs leading-relaxed mb-2 overflow-hidden"
          style={{
            color: "#f1f1f3",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.caption}
        </p>
        <p className="text-xs" style={{ color: "#8b8b9a" }}>
          {formatDate(post.scheduledDate)}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1.5 mt-3">
          <button
            onClick={() => onEdit(post)}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors"
            style={{ background: "#2a2a2e", color: "#8b8b9a" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#f1f1f3"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8b8b9a"; }}
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors"
            style={{ background: "#2a2a2e", color: "#8b8b9a" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8b8b9a"; }}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
