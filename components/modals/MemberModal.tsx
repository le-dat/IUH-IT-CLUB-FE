"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FORM_SIGN } from "@/constants/auth";
import { FORM_USER } from "@/constants/user";
import { validationUserSchema } from "@/lib/validate";
import { IUser } from "@/types/user-type";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
  member?: IUser;
  isAdmin: boolean;
}

export default function MemberModal({ isOpen, onClose, mode, member, isAdmin }: MemberModalProps) {
  const [formData, setFormData] = useState({
    username: member?.username || "",
    email: member?.email || "",
    codeStudent: member?.codeStudent || "",
    phone: member?.phone || "",
    // role: member?.role || "",
    // team: member?.team || "",
    // status: member?.status || "Active",
  });

  const isViewMode = mode === "view";
  const canEdit = isAdmin && mode !== "view";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-manager`],
    queryFn: () => userService.getUserById({ id: member?._id as string }),
  });

  const { mutate, isPending } = useMutation({ mutationFn: userService.updateUserById });

  const methods = useForm({
    // resolver: yupResolver(validationUserSchema),
  });

  const {
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = true;
  // watch(FORM_LOGIN.email) && watch(FORM_LOGIN.password);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    mutate(data, {
      onSuccess: (response) => {
        toast.success(response?.message);
        // setUser(response?.data?.user!)
        // setLocalStorage('user', response?.data?.user!)
        // TokenStorage.setToken(response?.data?.tokens?.access_token!)
        // TokenStorage.setRefreshToken(response?.data?.tokens?.refresh_token!)
        // router.push(ROUTES.HOME)
        reset();
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "An error occurred during login");
      },
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Thêm Thành Viên Mới"
              : mode === "edit"
              ? "Chỉnh Sửa Thành Viên"
              : "Chi Tiết Thành Viên"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Thêm một thành viên mới vào câu lạc bộ công nghệ"
              : mode === "edit"
              ? "Cập nhật thông tin thành viên"
              : "Xem chi tiết thành viên"}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label className="text-amber-900" htmlFor="name">Họ và Tên</Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.username}</p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.username}
                      {...register(FORM_SIGN.username)}
                      placeholder="Nhập họ và tên thành viên"
                      required
                    />
                    {errors[FORM_USER.username] && (
                      <span>{errors?.[FORM_USER.username]?.message?.toString()}</span>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-900" htmlFor={FORM_SIGN.email}>Email</Label>
                {isViewMode ? (
                  <p>
                    <Link href={`mailto:${member?.email}`} target="_blank" className="text-sm">
                      {member?.email}
                    </Link>
                  </p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.email}
                      {...register(FORM_USER.email)}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                    {errors[FORM_USER.email] && (
                      <span>{errors?.[FORM_USER.email]?.message?.toString()}</span>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-900" htmlFor={FORM_SIGN.codeStudent}>Mã số sinh viên</Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.codeStudent}</p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.codeStudent}
                      {...register(FORM_USER.codeStudent)}
                      placeholder="20111111"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                    {errors[FORM_USER.codeStudent] && (
                      <span>{errors?.[FORM_USER.codeStudent]?.message?.toString()}</span>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-amber-900" htmlFor="phone">Phone (Zalo)</Label>
                {isViewMode ? (
                  <p>
                    <Link
                      href={`https://zalo.me/${member?.phone}`}
                      target="_blank"
                      className="text-sm"
                    >
                      {member?.phone}
                    </Link>
                  </p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.phone}
                      {...register(FORM_USER.phone)}
                      placeholder="Nhập số điện thoại"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                    {errors[FORM_USER.phone] && (
                      <span>{errors?.[FORM_USER.phone]?.message?.toString()}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {isViewMode && member?.skills && (
              <div className="space-y-2">
                <Label>Kỹ Năng</Label>
                <div className="flex gap-2 flex-wrap">
                  {member.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="shrink-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              {canEdit && (
                <Button type="submit">
                  {mode === "create" ? "Thêm Thành Viên" : "Lưu Thay Đổi"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
