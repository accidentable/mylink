# 마이링크 (MyLink)

여러 링크를 한 페이지에 모아 공유하는 링크트리 클론입니다. 「아이디어를 현실로 - 바이브 코딩」 수업 과제로 만들었습니다.

- 공개 페이지: https://accidentable.github.io/mylink/
- 관리 페이지: https://accidentable.github.io/mylink/mypage/

## 기능

| 기능 | 위치 | 수업 주차 |
|---|---|---|
| 프로필(사진, 이름, 소개), 반응형 화면 | `/` | 2~4주차 |
| 링크 목록 (데이터 파일 → 목록 컴포넌트) | `/`, `data/links.ts` | 6주차 |
| 링크 추가, 빈칸·주소 형식 검증 | `/mypage` | 7주차 |
| 새로고침해도 남는 저장 | `lib/link-store.ts` | 9주차 |
| 링크 수정(목록에서 바로), 삭제 확인 창, 순서 바꾸기 | `/mypage` | 10주차 |
| 프로필 편집 | `/mypage` | 12주차 |
| 링크별 클릭 수와 합계 | `/mypage` | 13주차 |
| SEO·OG 태그, GitHub Pages 자동 배포 | `app/layout.tsx`, `.github/workflows` | 14주차 |

## 사용한 도구

- Next.js 15 (App Router, 정적 export)
- shadcn/ui, Tailwind CSS
- GitHub Actions + GitHub Pages (main에 푸시하면 자동 배포)

## 강의 구성과 다른 점

강의는 Firebase(Firestore, 구글 로그인)와 Vercel을 쓰지만, 이 과제는 GitHub Pages 주소로 제출해야 해서 서버 없이 돌아가도록 만들었습니다.

- 저장은 브라우저 `localStorage`에 합니다. 그래서 관리 페이지에서 바꾼 내용과 클릭 수는 **그 브라우저에서만** 보입니다. 모든 방문자에게 보일 기본 링크는 `data/links.ts`를 고쳐서 푸시하면 됩니다.
- 화면 코드는 `lib/link-store.ts`의 함수(`addLink`, `updateLink`, `deleteLink`, `recordClick` …)만 부르므로, 나중에 Firebase로 바꿀 때는 이 파일 안쪽만 Firestore 호출로 바꾸면 됩니다.
- 로그인이 없으므로 `/mypage`는 누구나 열 수 있지만, 바꾼 내용은 그 사람 브라우저에만 저장됩니다.

## 로컬에서 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 열립니다.
