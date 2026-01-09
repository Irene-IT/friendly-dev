import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import { Link } from "react-router";
import PostCard from "~/components/PostCard";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";
import Pagination from "~/components/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/data/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error("Не вдалося завантажити пости");
  }

  const data = await res.json();
  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [searchQuery, setSearchQuery] = useState("")
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">📝 Блог</h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Скидання на першу сторінку при фільтрації
        }}
      />

      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center">Постів не знайдено.</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogPage;

