import { SearchClient } from "@/components/search-client";
import { getAllPosts } from "@/lib/posts";

export default function SearchPage() {
  const posts = getAllPosts();
  const items = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    tags: post.tags,
    excerpt: post.excerpt,
    content: post.content
  }));

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-3xl font-bold text-ink dark:text-white">搜索</h1>
      <p className="mt-3 text-slate-500">支持全文、分类和标签搜索</p>
      <SearchClient posts={items} />
    </main>
  );
}
