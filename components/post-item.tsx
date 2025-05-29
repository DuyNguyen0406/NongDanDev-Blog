import { Calendar } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article className="card bg-base-100 shadow-sm p-4 border border-base-200">
      <div className="card-body p-0 space-y-2">
        <h2 className="card-title text-2xl text-base-content">
          <Link href={`/${slug}`} className="link link-hover text-base-content">
            {title}
          </Link>
        </h2>

        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        ) : null}

        {description && <p className="text-base text-neutral">{description}</p>}

        <div className="flex justify-between items-center pt-2">
          <div className="text-sm text-base-content flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>

          <Link href={`/${slug}`} className="btn text-base-content px-2">
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
