import { getCollection } from 'astro:content';

export async function getSortedPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => {
    const orderDiff = a.data.order - b.data.order;
    if (orderDiff !== 0) return orderDiff;
    return b.data.pubDate.getTime() - a.data.pubDate.getTime();
  });
}

export async function getFirstPost() {
  const posts = await getSortedPosts();
  return posts[0];
}
