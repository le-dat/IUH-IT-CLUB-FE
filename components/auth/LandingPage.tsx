"use client";

import { Button } from "@/components/ui/button";
import { CircuitBoard, Code2, Users, Laptop, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import ButtonGradient from "../common/ButtonGradient";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
          />
        </div>

        <div className="container mx-auto px-6 py-16 relative">
          <nav className="flex items-center justify-between mb-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <CircuitBoard className="h-6 w-6" />
              <span className="text-xl font-bold hidden lg:block">Câu lạc bộ lập trình IUH</span>
            </motion.div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/login">
                  <Button variant="secondary">Đăng Nhập</Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/register">
                  <ButtonGradient>Đăng kí</ButtonGradient>
                </Link>
              </motion.div>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-6xl font-bold tracking-tight bg-clip-text text-transparent leading-[5rem] bg-gradient-to-r from-primary to-primary/60">
                Kết nối, Kiến tạo, Hợp tác
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl text-muted-foreground">
                Tham gia câu lạc bộ sôi động của chúng tôi gồm các nhà phát triển, nhà thiết kế và
                nhà đổi mới công nghệ. Chia sẻ kiến thức, xây dựng dự án và cùng nhau phát triển.
              </p>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <Link href="/register">
                <ButtonGradient hasArrow>Tham gia Cộng đồng</ButtonGradient>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Tìm Hiểu Thêm
                </Button>
              </Link>
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Học Tập Cộng Tác</h3>
            <p className="text-muted-foreground">
              Học hỏi từ bạn bè, chia sẻ kiến thức và phát triển kỹ năng thông qua các dự án thực
              hành và hội thảo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Cộng Đồng Năng Động</h3>
            <p className="text-muted-foreground">
              Tham gia câu lạc bộ sôi động của những người đam mê công nghệ, cố vấn và các chuyên
              gia trong ngành.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Truy Cập Tài Nguyên</h3>
            <p className="text-muted-foreground">
              Truy cập các công cụ phát triển, tài nguyên học tập và hỗ trợ quản lý dự án.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-2xl p-12 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">Sẵn Sàng Tham Gia Câu Lạc Bộ Của Chúng Tôi?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bắt đầu hành trình của bạn với Câu lạc bộ lập trình IUH ngay hôm nay. Kết nối với
              những người cùng chí hướng, truy cập tài nguyên quý giá và nâng cao kỹ năng của bạn.
            </p>
            <Link href="/register">
              <Button size="lg">Đăng kí ngay</Button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <CircuitBoard className="h-5 w-5" />
              <span className="font-semibold">Câu lạc bộ lập trình IUH</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                target="_blank"
                href="https://ledat-portfolio.vercel.app"
                className="text-sm hover:text-primary hover:underline hover:text-blue-600"
              >
                © 2024 Le Dat. All rights reserved.
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
