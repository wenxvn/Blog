"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import clsx from "clsx";
import type { GroupedPosts, PostMeta } from "@/lib/types";

const MIN_SIDEBAR_WIDTH = 220;
const MAX_SIDEBAR_WIDTH = 420;

export function ReaderShell({ groups }: { groups: GroupedPosts[] }) {
  const firstPost = groups[0]?.posts[0];
  const [opened, setOpened] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((group, index) => [group.category, index === 0]))
  );
  const [currentSlug, setCurrentSlug] = useState(firstPost?.slug ?? "");
  const [sidebarWidth, setSidebarWidth] = useState(260);

  const allPosts = useMemo(() => groups.flatMap((group) => group.posts), [groups]);
  const current = allPosts.find((post) => post.slug === currentSlug) ?? firstPost;

  function startResize(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startWidth = sidebarWidth;

    function handleMove(moveEvent: PointerEvent) {
      const nextWidth = Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, startWidth + moveEvent.clientX - startX));
      setSidebarWidth(nextWidth);
    }

    function handleUp() {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    }

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp, { once: true });
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white dark:bg-slate-950">
      <div
        className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[var(--sidebar-width)_1fr]"
        style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}
      >
        <aside className="sidebar-scrollbar relative border-r border-slate-200 bg-white px-0 py-4 dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
          <nav className="space-y-2">
            {groups.map((group) => {
              const isOpen = opened[group.category];
              return (
                <section key={group.category}>
                  <button
                    type="button"
                    onClick={() => setOpened((prev) => ({ ...prev, [group.category]: !prev[group.category] }))}
                    className={clsx(
                      "flex w-full items-center justify-between border-l-4 px-6 py-3 text-left text-xl font-bold transition",
                      isOpen
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "border-transparent text-ink hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900"
                    )}
                  >
                    <span>{group.category}</span>
                    <span className="text-sm text-slate-400">{isOpen ? "▼" : "▶"}</span>
                  </button>

                  {isOpen && (
                    <div className="ml-6 mt-2 space-y-1 border-l border-slate-100 pb-2 dark:border-slate-800">
                      {group.posts.map((post, index) => (
                        <button
                          type="button"
                          key={post.slug}
                          onClick={() => setCurrentSlug(post.slug)}
                          className={clsx(
                            "block w-full px-5 py-2 text-left text-base leading-7 transition",
                            current?.slug === post.slug
                              ? "font-semibold text-emerald-600 dark:text-emerald-300"
                              : "text-slate-700 hover:text-emerald-600 dark:text-slate-300"
                          )}
                        >
                          {index + 1}. {post.title}
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </nav>

          <div
            role="separator"
            aria-orientation="vertical"
            onPointerDown={startResize}
            className="absolute right-[-5px] top-0 hidden h-full w-2 cursor-col-resize touch-none lg:block"
          />
        </aside>

        <section className="px-5 py-8 lg:px-10">
          {current ? <ArticlePanel post={current} /> : <EmptyPanel />}
        </section>
      </div>
    </main>
  );
}

function EmptyPanel() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
      暂无文章
    </div>
  );
}

function ArticlePanel({ post }: { post: PostMeta }) {
  const [source, setSource] = useState<MDXRemoteSerializeResult | null>(null);

  useMemo(() => {
    serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
      }
    }).then(setSource);
  }, [post.content]);

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{post.category}</p>
        <h1 className="mt-2 text-3xl font-bold text-ink dark:text-white">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>{post.date}</span>
          {post.problemUrl && (
            <a href={post.problemUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
              题目链接
            </a>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        {source ? <MDXRemote {...source} /> : <p>加载中...</p>}
      </div>
    </article>
  );
}
