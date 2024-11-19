import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";

const Config = dynamic(() => import("./config"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Câu lạc bộ lập trình IUH - Kết nối, Tạo ra, và Hợp tác",
  description:
    "Tham gia câu lạc bộ sôi động của chúng tôi gồm các nhà phát triển, nhà thiết kế và nhà đổi mới công nghệ.",
  icons: "/icons/logo.svg",
  manifest: "/manifest.json",
  openGraph: {
    title: "Câu lạc bộ lập trình IUH - Kết nối, Tạo ra, và Hợp tác",
    description:
      "Tham gia câu lạc bộ sôi động của chúng tôi gồm các nhà phát triển, nhà thiết kế và nhà đổi mới công nghệ.",

    url: process.env.NEXT_PUBLIC_APP_HOST || "https://iuh-it-club.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: "100%",
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Config>{children}</Config>
      </body>
    </html>
  );
}
