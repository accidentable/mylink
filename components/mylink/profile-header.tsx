"use client";

import { useMyLink } from "@/lib/link-store";

export function ProfileHeader() {
  const { profile } = useMyLink();
  return (
    <header className="border-b border-border pb-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={96}
        height={96}
        className="mb-4 size-20 rounded-full border border-border object-cover md:size-24"
      />
      <h1 className="text-2xl font-bold tracking-tight md:text-[26px]">{profile.name}</h1>
      <p className="mt-0.5 text-sm text-muted-foreground">@{profile.handle}</p>
      <p className="mt-3 whitespace-pre-line leading-[1.8]">{profile.bio}</p>
    </header>
  );
}
