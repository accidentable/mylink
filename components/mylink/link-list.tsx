"use client";

import { ArrowUpRight } from "lucide-react";
import { recordClick, useMyLink } from "@/lib/link-store";

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// 6주차: 배열을 순회하며 각 링크를 한 줄씩 그린다.
// 13주차: 링크를 누르면 클릭 수를 1 올린다.
export function LinkList() {
  const { links } = useMyLink();

  if (links.length === 0) {
    return <p className="py-6 text-sm text-muted-foreground">아직 등록된 링크가 없습니다.</p>;
  }

  return (
    <ul className="border-t border-border">
      {links.map((item) => (
        <li key={item.id} className="border-b border-border">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordClick(item.id)}
            onAuxClick={(e) => e.button === 1 && recordClick(item.id)}
            className="group flex min-h-14 items-center justify-between gap-4 px-1 py-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="min-w-0">
              <span className="block font-medium group-hover:text-primary group-hover:underline">
                {item.title}
              </span>
              {item.description && (
                <span className="block text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground">
              <span className="hidden sm:inline">{hostOf(item.url)}</span>
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
