"use client";

import { useMyLink } from "@/lib/link-store";

export function ProfileHeader() {
  const { profile } = useMyLink();
  return (
    <header className="border-b border-border pb-8">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={72}
          height={72}
          className="size-16 shrink-0 rounded-full border border-border object-cover md:size-[72px]"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-[26px]">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">@{profile.handle}</p>
        </div>
      </div>
      <p className="mt-5 whitespace-pre-line leading-[1.85]">{profile.bio}</p>
    </header>
  );
}
