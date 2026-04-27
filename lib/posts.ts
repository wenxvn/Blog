import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GroupedPosts, PostMeta } from "@/lib/types";
import heatmap from "@/data/heatmap.json";

const postsDirectory = path.join(process.cwd(), "posts");

const categoryOrder = [
  "洛谷",
  "力扣",
  "天梯赛",
  "牛客",
  "比赛记录",
];

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    return stat.isDirectory() ? walk(file) : file.endsWith(".md") ? [file] : [];
  });
}

function excerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`-]/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ")
    .slice(0, 140);
}

export function getAllPosts(): PostMeta[] {
  return walk(postsDirectory)
    .map((file) => {
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);
      const relative = path.relative(postsDirectory, file).replace(/\\/g, "/");
      const slug = relative.replace(/\.md$/, "");

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        category: String(data.category ?? "未分类"),
        problemUrl: data.problemUrl ? String(data.problemUrl) : undefined,
        excerpt: excerpt(content),
        content
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getGroupedPosts(): GroupedPosts[] {
  const posts = getAllPosts();
  const map = new Map<string, PostMeta[]>();

  for (const category of categoryOrder) map.set(category, []);
  for (const post of posts) {
    if (!map.has(post.category)) map.set(post.category, []);
    map.get(post.category)!.push(post);
  }

  return Array.from(map.entries())
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({
      category,
      posts: items.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"))
    }));
}

export function getHeatmapData() {
  return heatmap;
}
