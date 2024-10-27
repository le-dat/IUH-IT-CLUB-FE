"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircuitBoard, ArrowRight, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Bên trái - Biểu mẫu */}
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
            <h2 className="text-3xl font-bold">Đặt lại mật khẩu của bạn</h2>
            <p className="text-muted-foreground">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Địa chỉ email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button type="submit" className="w-full group">
                Gửi hướng dẫn đặt lại
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="h-5 w-5" />
                  <h3 className="font-semibold">Kiểm tra email của bạn</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>. Vui lòng
                  kiểm tra email của bạn và làm theo liên kết để đặt lại mật khẩu.
                </p>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                Thử email khác
              </Button>
            </motion.div>
          )}

          <div className="flex items-center justify-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại đăng nhập
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bên phải - Giới thiệu tính năng */}
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
              <h2 className="text-3xl font-bold mb-4">Bảo mật tài khoản</h2>
              <p className="text-muted-foreground mb-6">
                Chúng tôi coi trọng bảo mật tài khoản của bạn. Hãy làm theo hướng dẫn được gửi đến
                email của bạn để đặt lại mật khẩu một cách an toàn và lấy lại quyền truy cập vào tài
                khoản của bạn.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quy trình đặt lại an toàn</h3>
                    <p className="text-sm text-muted-foreground">
                      Đặt lại mật khẩu của bạn một cách an toàn thông qua email đã xác minh
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
