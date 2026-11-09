import { BookOpen, Bot, ChartLine, FolderGit2, IdCard, Link, MessagesSquare } from "lucide-react";
import type { LinkIcon as LinkIconName } from "@/data/links";

const ICONS = {
  chart: ChartLine,
  bot: Bot,
  id: IdCard,
  chat: MessagesSquare,
  book: BookOpen,
  code: FolderGit2,
  link: Link,
} as const;

// 5주차 와이어프레임: 각 링크는 아이콘 + 제목. 아이콘은 한 세트(lucide)로만 쓴다.
export function LinkIcon({ name }: { name?: LinkIconName }) {
  const Icon = ICONS[name ?? "link"] ?? Link;
  return (
    <span
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground"
    >
      <Icon className="size-[18px]" strokeWidth={1.75} />
    </span>
  );
}
