"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircuitBoard, ArrowRight, Github, Code2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ButtonGradient from "@/components/common/ButtonGradient";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-24 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80">
              <CircuitBoard className="h-6 w-6" />
              <h1 className="text-xl font-bold">Câu lạc bộ lập trình IUH</h1>
            </Link>
            <h2 className="text-3xl font-bold">Tạo tài khoản</h2>
            <p className="text-muted-foreground">
              Tham gia cộng đồng đam mê công nghệ của chúng tôi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Tên</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Họ</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Mã số sinh viên</Label>
              <Input
                id="studentId"
                placeholder="20111111"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <ButtonGradient type="submit">Tạo tài khoản</ButtonGradient>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Hoặc tiếp tục với</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Tiếp tục với GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Feature Showcase */}
      <div className="hidden lg:block lg:w-1/2 bg-muted relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"
        />
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Chào mừng đến với Câu lạc bộ lập trình IUH
              </h2>
              <p className="text-muted-foreground mb-6">
                Tham gia cộng đồng sôi động của chúng tôi gồm các nhà phát triển, nhà thiết kế và
                người đam mê công nghệ. Chia sẻ kiến thức, hợp tác trong các dự án và cùng nhau phát
                triển.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Kết nối với bạn bè</h3>
                    <p className="text-sm text-muted-foreground">
                      Kết nối với những người đam mê công nghệ cùng chí hướng
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Học hỏi & Phát triển</h3>
                    <p className="text-sm text-muted-foreground">
                      Truy cập tài nguyên và tham gia các dự án hợp tác
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
