import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { posts } from "#site/content";
import { Tag } from "@/components/tag";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default async function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-black">Tags</h1>
        </div>
      </div>

      <div className="divider my-6">All Tags</div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-wrap gap-3">
            {sortedTags.map((tag) => (
              <Tag key={tag} tag={tag} count={tags[tag]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
