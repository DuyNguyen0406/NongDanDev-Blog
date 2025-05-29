import { Post } from "#site/content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag: string) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export default function extractAllH3Variants(compiledMDX: string) {
  const h3List: Array<{ id: string; text: string }> = [];

  const h3Pattern = 'n("h3",{';
  const h3PatternWithId = 'n("h3",{id:';
  const h3PatternNested = 'n(a.p,{children:n("h3",{';

  const patterns = [h3Pattern, h3PatternWithId, h3PatternNested];

  for (const pattern of patterns) {
    let startIndex = 0;

    while (true) {
      const h3Start = compiledMDX.indexOf(pattern, startIndex);
      if (h3Start === -1) break;

      let braceCount = 1;
      let currentPos = h3Start + pattern.length;

      while (braceCount > 0 && currentPos < compiledMDX.length) {
        if (compiledMDX[currentPos] === "{") braceCount++;
        if (compiledMDX[currentPos] === "}") braceCount--;
        currentPos++;
      }

      const h3Block = compiledMDX.substring(h3Start, currentPos);

      let id = "";
      const idMatch = /id:\s*["']([^"']*)["']/.exec(h3Block);
      if (idMatch) {
        id = idMatch[1];
      }

      let text = "";
      const directTextMatch = /children:\s*["']([^"']*)["']/.exec(h3Block);
      const nestedTextMatch =
        /children:\s*n\([^,]+,\s*{children:\s*["']([^"']*)["']/.exec(h3Block);

      if (directTextMatch) {
        text = directTextMatch[1];
      } else if (nestedTextMatch) {
        text = nestedTextMatch[1];
      }

      if (text) {
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        h3List.push({ id, text });
      }

      startIndex = currentPos;
    }
  }

  return h3List;
}
