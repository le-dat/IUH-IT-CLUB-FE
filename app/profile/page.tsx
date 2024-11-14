"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FORM_USER } from "@/constants/user";
import { validationUserSchema } from "@/lib/validate";
import userService from "@/services/user-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Edit2, Github, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { mutate, isPending } = useMutation({ mutationFn: userService.updateUserById });
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-profile`],
    queryFn: () => userService.getMe(),
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>(
    data?.data?.skills || ["React", "TypeScript", "Node.js"]
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
    register,
    formState: { errors },
  } = methods;

  const isFormValid = true;
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;

    mutate(data, {
      onSuccess: (response) => {
        toast.success(response?.message);
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "An error occurred during login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              {/* Nội dung Hồ sơ */}
              <div className="grid gap-8 md:grid-cols-3">
                {/* Cột trái - Thông tin cá nhân */}
                <Card className="md:col-span-2 p-6 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={FORM_USER.username}>Tên</Label>
                        {isEditing ? (
                          <>
                            <Input
                              id={FORM_USER.username}
                              defaultValue="Lê Đạt"
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                            {errors[FORM_USER.username] && (
                              <span className="text-red-500 mt-2">
                                {errors?.[FORM_USER.username]?.message?.toString()}
                              </span>
                            )}
                          </>
                        ) : (
                          <p>Lê Đạt</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={FORM_USER.codeStudent}>Mã sinh viên</Label>
                        <Input
                          id={FORM_USER.codeStudent}
                          defaultValue="2022222"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors[FORM_USER.codeStudent] && (
                          <span className="text-red-500 mt-2">
                            {errors[FORM_USER.codeStudent]?.message?.toString()}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Giới thiệu</Label>
                        {isEditing ? (
                          <Textarea
                            id="bio"
                            defaultValue="Lập trình viên Full Stack đam mê xây dựng trải nghiệm người dùng tuyệt vời."
                            className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <p>
                            Lập trình viên Full Stack đam mê xây dựng trải nghiệm người dùng tuyệt
                            vời.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Kỹ năng</h2>
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

                {/* Cột phải - Liên kết xã hội & Hoạt động */}
                <div className="space-y-6">
                  <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Liên kết xã hội</h2>
                    <div className="space-y-3">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            type="email"
                            defaultValue="alex@example.com"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Github className="h-4 w-4" />
                          Email
                        </Button>
                      )}

                      {isEditing ? (
                        <div className="space-y-2">
                          <Label htmlFor="phone">Điện thoại (Zalo)</Label>
                          <Input
                            id="phone"
                            defaultValue="0123456789"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Github className="h-4 w-4" />
                          Điện thoại (Zalo)
                        </Button>
                      )}

                      {/* {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        type="email"
                        id="linkedin"
                        defaultValue="alex@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  )} */}
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Hoạt động</h2>
                    <div className="space-y-3">
                      {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Dự án</span>
                    <span className="font-medium">0</span>
                  </div> */}
                      {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nhóm</span>
                    <span className="font-medium">3</span>
                  </div> */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Sự kiện đã tham gia</span>
                        <span className="font-medium">1</span>
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
