"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FORM_USER } from "@/constants/user";
import { getCourseNumber } from "@/lib/utils";
import { validationUserSchema } from "@/lib/validate";
import userService from "@/services/user-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Edit2, Github, Mail, Phone, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { mutate, isPending } = useMutation({ mutationFn: userService.updateUserById });
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-profile`],
    queryFn: () => userService.getMe(),
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>(
    data?.data?.user?.skills || ["React", "TypeScript", "Node.js"]
  );
  const [newSkill, setNewSkill] = useState<string>("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const methods = useForm({
    resolver: yupResolver(validationUserSchema),
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
    watch(FORM_USER.email) &&
    watch(FORM_USER.level) &&
    watch(FORM_USER.phone) &&
    watch(FORM_USER.username);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    const formatData = { ...data, skillDetail: newSkill };
    console.log("formatData", formatData);
    if (isSubmitDisabled) return;

    mutate(formatData, {
      onSuccess: (response) => {
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

  return (
    <div className="min-h-screen bg-background py-12">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Tiêu đề Hồ sơ */}
              <div className="flex items-center justify-end">
                {/* <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full shadow-lg"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Lê Đạt</h1>
                    <p className="text-muted-foreground">Lập trình viên Full Stack</p>
                  </div>
                </div> */}
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "secondary" : "default"}
                >
                  {isEditing ? "Lưu thay đổi" : "Chỉnh sửa hồ sơ"}
                </Button>
              </div>

              {/* Content */}
              <div className="grid gap-8 md:grid-cols-3">
                {/* Left column - Personal information */}
                <Card className="md:col-span-2 p-6 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label className="text-xl font-semibold" htmlFor={FORM_USER.username}>
                          Tên
                        </Label>
                        {isEditing ? (
                          <>
                            <Input
                              id={FORM_USER.username}
                              {...register(FORM_USER.username)}
                              defaultValue="Tên người dùng"
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                            {errors[FORM_USER.username] && (
                              <span className="text-red-500 mt-2">
                                {errors?.[FORM_USER.username]?.message?.toString()}
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{data?.data?.user?.username}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xl font-semibold" htmlFor={FORM_USER.level}>
                          Khóa học
                        </Label>
                        {isEditing ? (
                          <>
                            <Controller
                              name={FORM_USER.level}
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
                            {errors[FORM_USER.level] && (
                              <span className="text-red-500 mt-2">
                                {errors[FORM_USER.level]?.message?.toString()}
                              </span>
                            )}
                          </>
                        ) : (
                          <p>{data?.data?.user?.level}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xl font-semibold" htmlFor={FORM_USER.description}>
                          Giới thiệu
                        </Label>
                        {isEditing ? (
                          <Textarea
                            id={FORM_USER.description}
                            {...register(FORM_USER.description)}
                            defaultValue="Lập trình viên Full Stack đam mê xây dựng trải nghiệm người dùng tuyệt vời."
                            className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <p>{data?.data?.user?.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xl font-semibold" htmlFor={FORM_USER.skills}>
                      Kỹ năng
                    </Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="group">
                            {skill}
                            {isEditing && (
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <form onSubmit={handleAddSkill} className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Thêm kỹ năng"
                            className="max-w-[200px]"
                          />
                          <Button type="submit" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Right column - Social links & Activities */}
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <Label className="text-xl font-semibold" htmlFor={FORM_USER.skills}>
                      Liên kết xã hội
                    </Label>
                    <div className="space-y-3">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Label htmlFor={FORM_USER.email}>Email</Label>
                          <Input
                            type="email"
                            id={FORM_USER.email}
                            {...register(FORM_USER.email)}
                            defaultValue="alex@example.com"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`mailto:${data?.data?.user?.email}`}
                              target="_blank"
                              className="text-sm hover:underline hover:italic"
                            >
                              <Button variant="outline" className="w-full justify-start gap-2">
                                <Mail className="h-4 w-4" />
                                Email
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-yellow-500">
                            <span>Gửi email cho </span>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {isEditing ? (
                        <div className="space-y-2">
                          <Label htmlFor={FORM_USER.phone}>Điện thoại</Label>
                          <Input
                            id={FORM_USER.phone}
                            {...register(FORM_USER.phone)}
                            defaultValue="0123456789"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`https://zalo.me/${data?.data?.user?.phone}`}
                              target="_blank"
                              className="text-sm hover:underline hover:italic"
                            >
                              <Button variant="outline" className="w-full justify-start gap-2">
                                <Phone className="h-4 w-4" />
                                {data?.data?.user?.phone}
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-yellow-500">
                            <span>Liên lạc bằng zalo </span>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Hoạt động</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Nhóm</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Sự kiện đã tham gia</span>
                        <span className="font-medium">0</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
