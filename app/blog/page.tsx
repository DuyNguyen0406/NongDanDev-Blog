import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="content-grid col-full-width py-6 lg:py-10">
      <div className="col-content bg-blue-500">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black">Blog</h1>
            <p className="text-xl text-base-content/70">
              My ramblings on all things web dev.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8 pb-8">
            {displayPosts.length > 0 ? (
              <>
                <ul className="flex flex-col gap-4">
                  {displayPosts.map((post) => {
                    const { slug, date, title, description, tags } = post;
                    return (
                      <li key={slug}>
                        <PostItem
                          slug={slug}
                          date={date}
                          title={title}
                          description={description}
                          tags={tags}
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 flex justify-end">
                  <QueryPagination totalPages={totalPages} />
                </div>
              </>
            ) : (
              <p className="text-center text-lg text-base-content/60 mt-4">
                Nothing to see here yet.
              </p>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {sortedTags.map((tag) => (
                    <Tag tag={tag} key={tag} count={tags[tag]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
