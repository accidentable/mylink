import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
      <body className={`${notoSansKr.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
