import ProtectRouter from "@/provider/protect-router-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <ReactQueryProvider>
          <ProtectRouter>
            <TooltipProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster
                  className='toaster pointer-events-auto [&[data-close-button="true"]]:right-0'
                  position="top-right"
                  richColors
                  closeButton
                  duration={3000}
                />
              </ThemeProvider>
            </TooltipProvider>
          </ProtectRouter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
