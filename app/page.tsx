import { HomeHero } from "@/components/home-hero";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const categoryCount = new Set(posts.map((post) => post.category)).size;

  return <HomeHero articleCount={posts.length} categoryCount={categoryCount} />;
}
