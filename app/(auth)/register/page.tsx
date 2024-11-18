"use client";

import ButtonGradient from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORM_SIGN } from "@/constants/auth";
import { ROUTES } from "@/constants/route";
import { getCourseNumber } from "@/lib/utils";
import { validationRegisterSchema } from "@/lib/validate";
import authService from "@/services/auth-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, CircuitBoard, Code2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({ mutationFn: authService.register });

  const methods = useForm({
    resolver: yupResolver(validationRegisterSchema),
  });

  const {
    watch,
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const isFormValid =
    watch(FORM_SIGN.username) &&
    watch(FORM_SIGN.email) &&
    watch(FORM_SIGN.level) &&
    watch(FORM_SIGN.phone) &&
    watch(FORM_SIGN.password) &&
    watch(FORM_SIGN.confirmPassword);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    delete data?.confirmPassword;
    if (isSubmitDisabled) return;

    mutate(data, {
      onSuccess: (response) => {
        router.push(ROUTES.LOGIN);
        toast.success(response?.message);
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Đã có lỗi xảy ra");
      },
    });
  };
  const onErrors = (errors: any) => console.error(errors);

  const handleBack = () => {
    router.push(ROUTES.LANDING_PAGE);
  };

  return (
    <div className="min-h-screen flex">
      <Button onClick={handleBack} className="fixed top-5 left-10 z-10 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Left side - Login Form */}
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

      {/* Right side - Feature Showcase */}
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

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.username}>Tên</Label>
                <Input
                  id={FORM_SIGN.username}
                  {...register(FORM_SIGN.username)}
                  placeholder="Nguyễn Văn A"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors[FORM_SIGN.username] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.username]?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.email}>Email</Label>
                <Input
                  id={FORM_SIGN.email}
                  {...register(FORM_SIGN.email)}
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors[FORM_SIGN.email] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.email]?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.level}>Khóa học</Label>
                <Controller
                  name={FORM_SIGN.level}
                  control={control}
                  rules={{ required: "Khóa học là bắt buộc" }}
                  render={({ field }) => (
                    <Select {...field} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn khóa học" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 7 }).map((_, index) => (
                          <SelectItem key={index} value={getCourseNumber(index)}>
                            {getCourseNumber(index)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_SIGN.level] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.level]?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.phone}>Số điện thoại</Label>
                <Input
                  id={FORM_SIGN.phone}
                  {...register(FORM_SIGN.phone)}
                  placeholder="Nhập số điện thoại"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors[FORM_SIGN.phone] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.phone]?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.password}>Mật khẩu</Label>
                <Input
                  id={FORM_SIGN.password}
                  {...register(FORM_SIGN.password)}
                  type="password"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors[FORM_SIGN.password] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.password]?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.confirmPassword}>Xác nhận mật khẩu</Label>
                <Input
                  id={FORM_SIGN.confirmPassword}
                  {...register(FORM_SIGN.confirmPassword)}
                  type="password"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors[FORM_SIGN.confirmPassword] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_SIGN.confirmPassword]?.message?.toString()}
                  </span>
                )}
              </div>

              <ButtonGradient type="submit" hasArrow>
                Tạo tài khoản
              </ButtonGradient>
            </form>
          </FormProvider>

          {/* <div className="space-y-4">
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
          </div> */}

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
