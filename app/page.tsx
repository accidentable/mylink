import Link from "next/link";
import { ProfileHeader } from "@/components/mylink/profile-header";
import { LinkSections } from "@/components/mylink/link-list";
import { profile } from "@/data/links";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[600px] px-4 pb-16 pt-12 md:px-6 md:pt-16">
      <ProfileHeader />
      <LinkSections />

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
        <span>마지막 수정 {profile.updatedAt}</span>
        <Link
          href="/mypage/"
          className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground"
        >
          내 링크 관리
        </Link>
      </footer>
    </main>
  );
}
