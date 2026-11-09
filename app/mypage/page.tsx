"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkFormFields, type LinkFields } from "@/components/mylink/link-form-fields";
import { LinkIcon } from "@/components/mylink/link-icon";
import { kindOf } from "@/components/mylink/link-list";
import { GROUPS } from "@/data/links";
import {
  addLink,
  deleteLink,
  moveLink,
  normalizeUrl,
  resetAll,
  updateLink,
  updateProfile,
  useMyLink,
  validateLink,
  type LinkErrors,
  type StoredLink,
} from "@/lib/link-store";

const SECTIONS = [
  { id: "profile", label: "프로필" },
  { id: "add", label: "링크 추가" },
  { id: "manage", label: "링크 수정·삭제" },
  { id: "stats", label: "클릭 통계" },
];

export default function MyPage() {
  return (
    <main className="mx-auto w-full max-w-[600px] px-4 pb-16 pt-12 md:px-6 md:pt-16">
      <header className="border-b border-border pb-6">
        <h1 className="text-2xl font-bold tracking-tight">내 링크 관리</h1>
        <p className="mt-2 text-muted-foreground">
          여기서 바꾼 내용은 이 브라우저에 저장되어 새로고침해도 남아 있습니다. 다른 기기나
          다른 브라우저에는 보이지 않습니다.
        </p>
        <ol className="mt-4 list-inside list-decimal text-sm text-muted-foreground">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="underline-offset-4 hover:text-foreground hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </header>

      <ProfileSection />
      <AddSection />
      <ManageSection />
      <StatsSection />

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          내 마이링크 보기
        </Link>
        <ResetButton />
      </footer>
    </main>
  );
}

/* 1. 프로필 편집 (12주차) */
function ProfileSection() {
  const { profile } = useMyLink();
  const [name, setName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");

  const nameValue = name ?? profile.name;
  const bioValue = bio ?? profile.bio;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nameValue.trim()) {
      setError("이름을 입력해 주세요.");
      setSaved("");
      return;
    }
    updateProfile({ name: nameValue.trim(), bio: bioValue.trim() });
    setName(null);
    setBio(null);
    setError("");
    setSaved("프로필을 저장했습니다.");
  }

  return (
    <section id="profile" aria-labelledby="profile-title" className="mt-10 scroll-mt-6">
      <h2 id="profile-title" className="mb-4 text-lg font-bold tracking-tight">
        1. 프로필
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="profile-name">이름</Label>
          <Input
            id="profile-name"
            value={nameValue}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!error}
            className="h-11"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="profile-bio">소개</Label>
          <Textarea
            id="profile-bio"
            value={bioValue}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="leading-relaxed"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit" variant="outline" className="h-11 px-6">
            프로필 저장
          </Button>
          <p role="status" className="text-sm text-muted-foreground">
            {saved}
          </p>
        </div>
      </form>
    </section>
  );
}

/* 2. 링크 추가 (7주차 Create) */
function AddSection() {
  const empty: LinkFields = { title: "", url: "", description: "", group: "work" };
  const [fields, setFields] = useState<LinkFields>(empty);
  const [errors, setErrors] = useState<LinkErrors>({});
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validateLink(fields.title, fields.url);
    setErrors(next);
    if (next.title || next.url) {
      setMessage("");
      return;
    }
    const item = addLink({
      title: fields.title.trim(),
      url: normalizeUrl(fields.url),
      group: fields.group,
      description: fields.description.trim(),
    });
    setFields(empty);
    setMessage(`"${item.title}" 링크를 추가했습니다.`);
  }

  return (
    <section id="add" aria-labelledby="add-title" className="mt-12 scroll-mt-6">
      <h2 id="add-title" className="mb-4 text-lg font-bold tracking-tight">
        2. 링크 추가
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <LinkFormFields
          idPrefix="add"
          {...fields}
          errors={errors}
          onChange={(field, value) => setFields((f) => ({ ...f, [field]: value }))}
        />
        <div className="flex items-center gap-4">
          <Button type="submit" className="h-11 px-6">
            링크 추가
          </Button>
          <p role="status" className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </form>
    </section>
  );
}

/* 3. 링크 수정·삭제 (10주차 Update/Delete) */
function ManageSection() {
  const { links } = useMyLink();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <section id="manage" aria-labelledby="manage-title" className="mt-12 scroll-mt-6">
      <h2 id="manage-title" className="mb-2 text-lg font-bold tracking-tight">
        3. 링크 수정·삭제 <span className="font-normal text-muted-foreground">({links.length}개)</span>
      </h2>
      {links.length === 0 ? (
        <p className="py-6 text-sm text-muted-foreground">아직 등록된 링크가 없습니다.</p>
      ) : (
        <ul className="border-t border-border">
          {links.map((item, index) => (
            <li key={item.id} className="border-b border-border py-4">
              {editingId === item.id ? (
                <EditRow item={item} onDone={() => setEditingId(null)} />
              ) : (
                <ViewRow
                  item={item}
                  isFirst={index === 0}
                  isLast={index === links.length - 1}
                  onEdit={() => setEditingId(item.id)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ViewRow({
  item,
  isFirst,
  isLast,
  onEdit,
}: {
  item: StoredLink;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <LinkIcon name={item.icon} />
        <div className="min-w-0">
          <p className="font-medium leading-snug">{item.title}</p>
          <p className="truncate text-[13px] text-muted-foreground">
            {GROUPS.find((g) => g.id === (item.group ?? "work"))?.title} · {kindOf(item.url)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 pl-[52px] sm:pl-0">
        <Button
          variant="ghost"
          size="icon"
          className="size-11"
          disabled={isFirst}
          onClick={() => moveLink(item.id, -1)}
          aria-label={`${item.title} 위로 옮기기`}
        >
          <ArrowUp className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-11"
          disabled={isLast}
          onClick={() => moveLink(item.id, 1)}
          aria-label={`${item.title} 아래로 옮기기`}
        >
          <ArrowDown className="size-4" />
        </Button>
        <Button variant="outline" className="h-11 px-4" onClick={onEdit}>
          수정
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="h-11 px-4 text-destructive hover:text-destructive">
              삭제
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>&quot;{item.title}&quot; 링크를 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                삭제하면 되돌릴 수 없고, 이 링크의 클릭 수({item.clicks}회)도 함께 지워집니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={() => deleteLink(item.id)}>
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function EditRow({ item, onDone }: { item: StoredLink; onDone: () => void }) {
  const [fields, setFields] = useState<LinkFields>({
    title: item.title,
    url: item.url,
    description: item.description ?? "",
    group: item.group ?? "work",
  });
  const [errors, setErrors] = useState<LinkErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validateLink(fields.title, fields.url);
    setErrors(next);
    if (next.title || next.url) return;
    updateLink(item.id, {
      title: fields.title.trim(),
      url: normalizeUrl(fields.url),
      group: fields.group,
      description: fields.description.trim(),
    });
    onDone();
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Escape" && onDone()}
      noValidate
      className="space-y-4 py-1"
    >
      <LinkFormFields
        idPrefix={`edit-${item.id}`}
        {...fields}
        errors={errors}
        onChange={(field, value) => setFields((f) => ({ ...f, [field]: value }))}
      />
      <div className="flex gap-2">
        <Button type="submit" className="h-11 px-6">
          저장
        </Button>
        <Button type="button" variant="outline" className="h-11 px-6" onClick={onDone}>
          취소
        </Button>
      </div>
    </form>
  );
}

/* 4. 클릭 통계 (13주차) */
function StatsSection() {
  const { links } = useMyLink();
  const total = links.reduce((sum, l) => sum + l.clicks, 0);
  const max = Math.max(1, ...links.map((l) => l.clicks));
  const sorted = [...links].sort((a, b) => b.clicks - a.clicks);

  return (
    <section id="stats" aria-labelledby="stats-title" className="mt-12 scroll-mt-6">
      <h2 id="stats-title" className="mb-2 text-lg font-bold tracking-tight">
        4. 클릭 통계
      </h2>
      <p className="mb-4 text-muted-foreground">
        지금까지 링크가 모두 <strong className="font-bold text-foreground tabular-nums">{total}번</strong>{" "}
        눌렸습니다. 공개 페이지에서 링크를 누를 때마다 1씩 올라갑니다.
      </p>
      {links.length > 0 && (
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b-2 border-foreground/80 text-left">
              <th scope="col" className="py-2 pr-3 font-medium">
                링크
              </th>
              <th scope="col" className="w-16 py-2 text-right font-medium">
                클릭
              </th>
              <th scope="col" className="hidden w-[38%] py-2 pl-4 font-medium sm:table-cell">
                <span className="sr-only">비율</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((l) => (
              <tr key={l.id} className="border-b border-border">
                <td className="truncate py-2.5 pr-3">{l.title}</td>
                <td className="py-2.5 text-right tabular-nums">{l.clicks}</td>
                <td className="hidden py-2.5 pl-4 sm:table-cell" aria-hidden>
                  <div className="h-2 w-full bg-muted">
                    <div className="h-2 bg-primary" style={{ width: `${(l.clicks / max) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function ResetButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="min-h-11 underline underline-offset-4 hover:text-foreground">
          처음 상태로 되돌리기
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>처음 상태로 되돌릴까요?</AlertDialogTitle>
          <AlertDialogDescription>
            이 브라우저에 저장한 프로필 수정, 추가·수정한 링크, 클릭 수가 모두 지워지고 기본
            링크로 돌아갑니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => resetAll()}>
            되돌리기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
