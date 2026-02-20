import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AOVO LOGISTICS | 물류장비 구독 서비스",
  description:
    "AOVO LOGISTICS - 이동식도크, 리프트, 롤테이너, 트레일러 등 물류장비를 월 구독료로. 초기 비용 없이 도입부터 유지보수까지.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Gmarket Sans — headline font (CDN) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.css"
        />
        {/* SUIT — body font (CDN) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
