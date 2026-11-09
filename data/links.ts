// 6주차: 데이터와 화면을 나눈다. 링크를 바꾸려면 이 파일만 고치면 된다.

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export const profile = {
  name: "윤태호",
  handle: "accidentable",
  image: "https://github.com/accidentable.png?size=240",
  bio: "해커톤에 자주 나가는 개발자입니다. 금융 데이터와 AI, 블록체인을 엮어서 며칠 안에 실제로 돌아가는 서비스를 만드는 걸 좋아합니다. 요즘은 AI 코딩 도구로 아이디어를 화면까지 빠르게 옮기는 연습을 하고 있습니다.",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/accidentable",
    description: "지금까지 만든 저장소 전체",
  },
  {
    id: "fred",
    title: "FRED 경제 지표 챗봇",
    url: "https://github.com/accidentable/FRED-",
    description: "보고 싶은 경제 지표를 채팅으로 물으면 한 화면에 모아 보여 줍니다",
  },
  {
    id: "kleague",
    title: "K리그 AI 해커톤",
    url: "https://github.com/accidentable/K-league-Hackathon",
    description: "K리그 데이터로 참가한 AI 해커톤 작업물",
  },
  {
    id: "avalanche",
    title: "Avalanche 문서 한국어판",
    url: "https://github.com/accidentable/Avalanche-docs-Korean",
    description: "Avalanche 블록체인 개발 문서를 한국어로 옮긴 저장소",
  },
  {
    id: "bike",
    title: "따릉이 DB 프로젝트",
    url: "https://github.com/accidentable/DB_Bike",
    description: "서울 공공자전거 데이터를 다룬 데이터베이스 과제",
  },
];
