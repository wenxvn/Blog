"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";

type SearchItem = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
};

export function SearchClient({ posts }: { posts: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "category", "tags", "excerpt", "content"],
        threshold: 0.35,
        ignoreLocation: true
      }),
    [posts]
  );

  const results = query.trim()
    ? fuse.search(query).map((item) => item.item)
    : posts;

  return (
    <section className="mt-8">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="输入关键词"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-emerald-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="mt-6 space-y-4">
        {results.map((post) => (
          <a
            key={post.slug}
            href={`/notes?article=${post.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-ink dark:text-white">{post.title}</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                {post.category}
              </span>
            </div>
            <p className="mt-3 line-clamp-2 text-slate-500">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm text-slate-500">#{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
