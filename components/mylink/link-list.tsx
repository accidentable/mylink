"use client";

import { ArrowUpRight } from "lucide-react";
import { GROUPS, type LinkGroup } from "@/data/links";
import { recordClick, useMyLink, type StoredLink } from "@/lib/link-store";
import { LinkIcon } from "./link-icon";

export function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// 눌렀을 때 무엇이 열리는지 글자로 알려 준다.
export function kindOf(url: string) {
  const host = hostOf(url);
  if (host === "github.com") {
    const path = new URL(url).pathname.split("/").filter(Boolean);
    return path.length >= 2 ? "저장소" : "프로필";
  }
  if (host.startsWith("hackathon-wiki")) return "위키";
  if (host.endsWith("nip.io")) return "데모";
  return "사이트";
}

function LinkRow({ item }: { item: StoredLink }) {
  return (
    <li className="border-b border-border">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => recordClick(item.id)}
        onAuxClick={(e) => e.button === 1 && recordClick(item.id)}
        className="group flex items-start gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <LinkIcon name={item.icon} />
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug group-hover:text-primary group-hover:underline group-hover:underline-offset-4">
            {item.title}
          </span>
          {item.description && (
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </span>
          )}
          {item.meta && (
            <span className="mt-1 block text-[13px] tabular-nums text-muted-foreground">
              {item.meta}
            </span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1 pt-0.5 text-[13px] text-muted-foreground group-hover:text-primary">
          <span className="hidden sm:inline">{kindOf(item.url)}</span>
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">(새 창에서 {kindOf(item.url)} 열기)</span>
        </span>
      </a>
    </li>
  );
}

// 6주차: 배열을 순회하며 각 링크를 한 줄씩 그린다.
// 13주차: 링크를 누르면 클릭 수를 1 올린다.
export function LinkSections() {
  const { links } = useMyLink();

  if (links.length === 0) {
    return <p className="mt-8 text-sm text-muted-foreground">아직 등록된 링크가 없습니다.</p>;
  }

  const byGroup = (g: LinkGroup) => links.filter((l) => (l.group ?? "work") === g);
  const visible = GROUPS.filter((g) => byGroup(g.id).length > 0);

  return (
    <>
      {visible.map((g, i) => (
        <section key={g.id} aria-labelledby={`group-${g.id}`} className="mt-10">
          <h2 id={`group-${g.id}`} className="mb-1 text-lg font-bold tracking-tight">
            {i + 1}. {g.title}
          </h2>
          <ul className="border-t border-border">
            {byGroup(g.id).map((item) => (
              <LinkRow key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
