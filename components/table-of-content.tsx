"use client";

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const uniqueHeadings = headings.filter(
    (heading, index, self) =>
      index ===
      self.findIndex(
        (h) => h.id === heading.id && h.text.trim() === heading.text.trim()
      )
  );

  return (
    <nav className="sticky bg-[#F6F7FB]  rounded-xl w-full overflow-hidden">
      <ul className="space-y-3">
        <p style={{ color: "#000000" }} className="text-lg font-semibold">
          In this article
        </p>
        {uniqueHeadings.map((heading) => (
          <li key={`${heading.id}-${heading.text}`} className="w-full flex">
            <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-2"></span>
            <a
              href={`#${heading.id}`}
              className="block text-sm hover:text-blue-600 text-gray-600 w-full"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span className="inline-block w-full sm:max-w-[80%] break-words sm:truncate">
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
