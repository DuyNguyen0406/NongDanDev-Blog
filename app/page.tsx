import { posts } from "#site/content";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);

  return (
    <>
      <section className="content-grid col-full-width space-y-6 pb-8 pt-6 md:pb-12 lg:py-32 bg-gray-100 dark:bg-gradient-to-b dark:from-[#5b9aff] dark:to-[#1f55f1] mb-10">
        <div className="col-content flex flex-col gap-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance text-primary">
              NongDan.dev Tech Blog
            </h1>
            <p className="max-w-[42rem] mx-auto sm:text-xl text-balance text-primary">
              Sharing programming knowledge, technology insights, and real-world
              experiences from the NongDan.dev team.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-fit"
                )}
              >
                View my blog
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="content-grid col-full-width">
        <div className="col-content">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
            Latest Posts
          </h2>

          <ul className="flex flex-col">
            {latestPosts.map(
              (post) =>
                post.published && (
                  <li key={post.slug} className="py-4">
                    <PostItem
                      slug={post.slug}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      tags={post.tags}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
