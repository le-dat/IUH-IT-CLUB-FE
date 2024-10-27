"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CircuitBoard, ArrowRight, Github, Users, Code2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ButtonGradient from "@/components/common/ButtonGradient";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
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
              <h1 className="text-xl font-bold">Câu lạc bộ Công nghệ IUH</h1>
            </Link>
            <h2 className="text-3xl font-bold">Chào mừng trở lại</h2>
            <p className="text-muted-foreground">
              Nhập thông tin đăng nhập để truy cập tài khoản của bạn
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="admin-mode" checked={isAdmin} onCheckedChange={setIsAdmin} />
                <Label htmlFor="admin-mode">Quyền truy cập Admin</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <ButtonGradient type="submit">Đăng nhập</ButtonGradient>
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
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Đăng ký
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
                Tham gia Cộng đồng Công nghệ của chúng tôi
              </h2>
              <p className="text-muted-foreground mb-6">
                Kết nối với các nhà phát triển khác, chia sẻ kiến thức và hợp tác trong các dự án
                thú vị. Nâng cao kỹ năng của bạn với Câu lạc bộ Công nghệ IUH.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cộng đồng năng động</h3>
                    <p className="text-sm text-muted-foreground">
                      Tham gia cộng đồng sôi động của những người đam mê công nghệ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Học tập hợp tác</h3>
                    <p className="text-sm text-muted-foreground">
                      Học hỏi và phát triển thông qua chia sẻ kiến thức đồng đẳng
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
