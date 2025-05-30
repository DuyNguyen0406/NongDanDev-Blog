import { sortPosts } from "@/lib/utils";
import Link from "next/link";
import type { Post } from "#site/content";

export default function Related({ posts }: { posts: Post[] }) {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <div className="flex flex-col items-start w-full">
      <p className="text-2xl px-4 font-bold mb-6 text-slate-800">
        Related Articles
      </p>

      {sortedPosts?.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {sortedPosts.slice(0, 4).map((post) => {
            const { slug, title, description } = post;
            return (
              <div
                key={slug}
                className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md hover:-translate-y-1 duration-200"
              >
                <Link href={`/${slug}`} className="block px-8 no-underline">
                  <p className="text-lg font-semibold">{title}</p>
                  <p className="text-sm line-clamp-2">
                    {description || "No description available."}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">
          Nothing to see here yet.
        </p>
      )}
    </div>
  );
}
