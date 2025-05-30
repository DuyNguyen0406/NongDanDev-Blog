import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts.filter((post) => post.published);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="content-grid col-full-width py-6 lg:py-10">
      <div className="col-content">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black capitalize">
              {title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-8">
          <div className="col-span-12 col-start-1 sm:col-span-8">
            {displayPosts.length > 0 ? (
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
            ) : (
              <p className="text-center text-base-content/60 mt-4">
                Nothing to see here yet.
              </p>
            )}
          </div>

          <div className="card bg-base-100 shadow border border-base-300 col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <div className="card-body p-4">
              <h2
                style={{ color: "#000000" }}
                className="card-title text-lg font-bold mb-2 text-black"
              >
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {sortedTags?.map((t) => (
                  <Tag
                    tag={t}
                    key={t}
                    count={tags[t]}
                    current={slug(t) === tag}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
