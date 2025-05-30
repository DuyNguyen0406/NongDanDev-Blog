import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import extractAllH3Variants, { sortPosts } from "@/lib/utils";
import { TableOfContents } from "@/components/table-of-content";
import Link from "next/link";
import Related from "../related";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  const A = JSON.stringify(post ? post.body : "");
  const B = JSON.parse(A);
  const h3Headings = extractAllH3Variants(B);
  const PostsArticle = sortPosts(
    posts.filter(
      (p) =>
        p.published &&
        p.slugAsParams !== post?.slugAsParams &&
        p.tags?.some((tag) => post?.tags?.includes(tag))
    )
  );
  const PostsRelated = sortPosts(
    posts.filter(
      (p) =>
        p.published &&
        p.slugAsParams !== post?.slugAsParams &&
        !p.tags?.some((tag) => post?.tags?.includes(tag))
    )
  );

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert max-w-[1440px] mx-auto gap-4 px-4">
      <div className="flex flex-col lg:flex-row  gap-4 flex-1 mb-10">
        <div className="w-full lg:max-w-[300px] lg:flex-1">
          <TableOfContents headings={h3Headings} />
        </div>

        <div className="w-full max-w-[800px] flex flex-col">
          <h1 className="mb-2">{post.title}</h1>
          <div className="flex gap-2 mb-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          {post.description ? (
            <p className="text-xl mt-0 text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          <hr className="my-4" />
          <MDXContent code={post.body} />
        </div>

        <div className="w-full lg:max-w-[300px] flex flex-col items-center lg:items-start">
          <div className="card bg-green-400 shadow-xl p-6 rounded-xl w-full">
            <h2 className="card-title text-slate-900 text-xl font-semibold leading-[150%] mt-0">
              Sign up for Nongdandev
            </h2>
            <p className="text-base font-normal leading-[150%] text-slate-900">
              Stay Updated with the Latest Security Insights!
            </p>
            <Link href={siteConfig.links.website} passHref>
              <button className="btn bg-green-950 text-[#DCFCE7] w-full">
                Subscribe
              </button>
            </Link>
          </div>

          <div className="w-full mt-6">
            {PostsArticle.length > 0 && (
              <p className="text-lg font-semibold leading-[150%] mb-5">
                Similar category article
              </p>
            )}
            <ul className="space-y-2">
              {PostsArticle.slice(0, 4).map(({ slug, title }) => (
                <li key={slug} className="cursor-pointer">
                  <Link className="no-underline" href={`/${slug}`} passHref>
                    <p className="text-base">{title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Related posts={PostsRelated} />
    </article>
  );
}
