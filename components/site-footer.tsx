import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer>
      <div
        className="mt-14 flex flex-col items-center 
  bg-slate-100 dark:bg-gradient-to-b dark:from-[#5b9aff] dark:to-[#1f55f1] p-6"
      >
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:hello@example.com">
            <span className="sr-only">Mail</span>
            <Icons.mail className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.linked}>
            <span className="sr-only">Twitter</span>
            <Icons.linked className="h-6 w-6" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.website}>
            <span className="sr-only">GitHub</span>
            <Icons.website className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a target="_blank">{siteConfig.author}</a>
        </div>
      </div>
    </footer>
  );
}
