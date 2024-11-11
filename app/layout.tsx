import ReactQueryProvider from "@/provider/react-query-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Câu lạc bộ lập trình IUH - Kết nối, Tạo ra, và Hợp tác",
  description:
    "Tham gia câu lạc bộ sôi động của chúng tôi gồm các nhà phát triển, nhà thiết kế và nhà đổi mới công nghệ.",
  icons: "/icons/logo.svg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
