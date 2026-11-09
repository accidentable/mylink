import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://accidentable.github.io/mylink/";
const TITLE = "윤태호 | 마이링크";
const DESCRIPTION = "윤태호의 링크 모음. 해커톤에서 금융·AI·블록체인 서비스를 만듭니다.";
const OG_IMAGE = "https://github.com/accidentable.png?size=400";

// 14주차: SEO 메타 태그와 OG 태그(카카오톡·슬랙에 링크를 붙였을 때 보이는 미리보기)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "마이링크",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 400, height: 400, alt: "윤태호 프로필 사진" }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 한글 폰트는 빌드 때 내려받지 않고 브라우저가 Google Fonts에서 직접 받는다. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
