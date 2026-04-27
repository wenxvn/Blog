import { ReaderShell } from "@/components/reader-shell";
import { getGroupedPosts } from "@/lib/posts";

export default function NotesPage() {
  const groups = getGroupedPosts();
  return <ReaderShell groups={groups} />;
}
