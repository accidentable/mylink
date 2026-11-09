import Link from "next/link";
import { ProfileHeader } from "@/components/mylink/profile-header";
import { LinkList } from "@/components/mylink/link-list";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[560px] px-4 pb-16 pt-10 md:px-5 md:pt-14">
      <ProfileHeader />

      <section aria-labelledby="links-title" className="mt-8">
        <h2 id="links-title" className="mb-2 text-lg font-bold tracking-tight">
          링크
        </h2>
        <LinkList />
      </section>

      <footer className="mt-10 text-[13px] text-muted-foreground">
        <Link href="/mypage/" className="underline underline-offset-4 hover:text-foreground">
          내 링크 관리
        </Link>
      </footer>
    </main>
  );
}
