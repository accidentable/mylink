// 6주차: 데이터와 화면을 나눈다. 링크를 바꾸려면 이 파일만 고치면 된다.

export type LinkGroup = "work" | "about";
export type LinkIcon = "chart" | "bot" | "id" | "chat" | "book" | "code" | "link";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  group: LinkGroup;
  description?: string;
  /** 기간, 숫자 같은 핵심 정보 한 줄 */
  meta?: string;
  icon?: LinkIcon;
};

export const GROUPS: { id: LinkGroup; title: string }[] = [
  { id: "work", title: "만든 것" },
  { id: "about", title: "기록과 프로필" },
];

export const profile = {
  name: "윤태호",
  handle: "accidentable",
  image: "https://github.com/accidentable.png?size=240",
  bio: "시장 데이터와 API로 빨리 만들고, 만든 건 글로 남깁니다. 트럼프 정책 번복 가능성을 점수로 보여 준 타코 트럼프는 3주 동안 5만 6천 명이 찾았고, 지금은 한국투자증권 API로 실전 자동매매 봇을 돌리고 있습니다.",
  updatedAt: "2026년 11월 9일",
};

const WIKI = "https://hackathon-wiki-rho.vercel.app";

export const links: LinkItem[] = [
  {
    id: "taco",
    group: "work",
    icon: "chart",
    title: "타코 트럼프",
    url: "https://github.com/accidentable/tacotrump",
    description: "시장 지표 6개로 트럼프 정책 번복 가능성을 0~6점으로 보여 준 웹 서비스",
    meta: "2026.03~04 운영 · 방문자 56,253명 · KPI뉴스 보도",
  },
  {
    id: "kis",
    group: "work",
    icon: "bot",
    title: "KIS MA5 Bot",
    url: `${WIKI}/#/p/kis-openapi-invest-2026-09`,
    description: "한투 OpenAPI로 실전 계좌를 굴리는 자동매매 봇. 5일선 돌파를 장중에 판정합니다",
    meta: "텔레그램으로 운영 중",
  },
  {
    id: "sabonx",
    group: "work",
    icon: "id",
    title: "SabonX",
    url: "https://211-233-200-43.nip.io/",
    description: "신분증 사본 없이 DID·VC로 급여를 확인하는 서비스",
    meta: "TRUST404 Track 02",
  },
  {
    id: "fred",
    group: "work",
    icon: "chat",
    title: "FRED 채팅",
    url: "https://github.com/accidentable/FRED-",
    description: "보고 싶은 미국 경제 지표를 채팅으로 물으면 한눈에 보여 줍니다",
  },
  {
    id: "wiki",
    group: "about",
    icon: "book",
    title: "해커톤 면접 노트",
    url: `${WIKI}/`,
    description: "해커톤에 나간 자료를 LLM이 위키로 정리한 사이트",
    meta: "프로젝트 14개 · 개념 49개",
  },
  {
    id: "github",
    group: "about",
    icon: "code",
    title: "GitHub",
    url: "https://github.com/accidentable",
    description: "전체 저장소와 프로필",
  },
];
