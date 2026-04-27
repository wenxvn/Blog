export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  problemUrl?: string;
  excerpt: string;
  content: string;
};

export type GroupedPosts = {
  category: string;
  posts: PostMeta[];
};
