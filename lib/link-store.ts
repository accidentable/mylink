"use client";

// 마이링크 데이터 저장소.
// 강의 9주차는 Firestore를 쓰지만, 이 프로젝트는 GitHub Pages(정적 호스팅)에 올리므로
// 브라우저 localStorage에 영구 저장한다. 화면 코드는 이 파일의 함수만 부르므로
// 나중에 Firebase로 바꿀 때는 이 파일 안쪽만 고치면 된다.

import { useSyncExternalStore } from "react";
import {
  links as seedLinks,
  profile as seedProfile,
  type LinkGroup,
  type LinkItem,
} from "@/data/links";

export type Profile = typeof seedProfile;
export type StoredLink = LinkItem & { clicks: number };
export type MyLinkState = { profile: Profile; links: StoredLink[] };

const STORAGE_KEY = "mylink:v2";

const seedState: MyLinkState = {
  profile: seedProfile,
  links: seedLinks.map((l) => ({ ...l, clicks: 0 })),
};

let state: MyLinkState = seedState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<MyLinkState>;
    if (parsed && Array.isArray(parsed.links) && parsed.profile) {
      state = {
        profile: { ...seedProfile, ...parsed.profile },
        links: parsed.links.map((l) => ({
          ...l,
          group: l.group === "about" ? "about" : "work",
          clicks: Number(l.clicks) || 0,
        })),
      };
    }
  } catch {
    // 저장소를 못 읽으면(사생활 보호 모드 등) 기본 데이터로 보여 준다.
  }
}

function commit(next: MyLinkState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 저장 실패해도 화면은 바뀐 상태로 둔다.
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    fn();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return seedState;
}

export function useMyLink() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------- CRUD ---------- */

export type LinkInput = { title: string; url: string; group: LinkGroup; description?: string };

export function addLink(input: LinkInput) {
  load();
  const item: StoredLink = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: input.title,
    url: input.url,
    group: input.group,
    description: input.description || undefined,
    icon: "link",
    clicks: 0,
  };
  commit({ ...state, links: [...state.links, item] });
  return item;
}

export function updateLink(id: string, patch: LinkInput) {
  load();
  commit({
    ...state,
    links: state.links.map((l) =>
      l.id === id ? { ...l, ...patch, description: patch.description || undefined } : l,
    ),
  });
}

export function deleteLink(id: string) {
  load();
  commit({ ...state, links: state.links.filter((l) => l.id !== id) });
}

export function moveLink(id: string, dir: -1 | 1) {
  load();
  const i = state.links.findIndex((l) => l.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= state.links.length) return;
  const next = [...state.links];
  [next[i], next[j]] = [next[j], next[i]];
  commit({ ...state, links: next });
}

// 13주차: 클릭 수 집계. 최신 상태를 읽고 1을 더해 저장한다.
export function recordClick(id: string) {
  load();
  commit({
    ...state,
    links: state.links.map((l) => (l.id === id ? { ...l, clicks: l.clicks + 1 } : l)),
  });
}

export function updateProfile(patch: Partial<Pick<Profile, "name" | "bio">>) {
  load();
  commit({ ...state, profile: { ...state.profile, ...patch } });
}

export function resetAll() {
  commit(seedState);
}

/* ---------- 입력 검증 ---------- */

export function normalizeUrl(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export type LinkErrors = { title?: string; url?: string };

export function validateLink(title: string, url: string): LinkErrors {
  const errors: LinkErrors = {};
  if (!title.trim()) errors.title = "제목을 입력해 주세요.";
  else if (title.trim().length > 40) errors.title = "제목은 40자 이내로 적어 주세요.";
  if (!url.trim()) {
    errors.url = "주소를 입력해 주세요.";
  } else {
    try {
      const parsed = new URL(normalizeUrl(url));
      if (!parsed.hostname.includes(".")) throw new Error("no dot");
    } catch {
      errors.url = "주소 형식이 올바르지 않습니다. 예: instagram.com/내아이디";
    }
  }
  return errors;
}
