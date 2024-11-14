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

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
  member?: any;
  isAdmin: boolean;
}

export default function MemberModal({ isOpen, onClose, mode, member, isAdmin }: MemberModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    studentId: member?.studentId || "",
    phone: member?.phone || "",
    // role: member?.role || "",
    // team: member?.team || "",
    // status: member?.status || "Active",
  });

  const isViewMode = mode === "view";
  const canEdit = isAdmin && mode !== "view";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-manager`],
    queryFn: () => userService.getUserById({ id: member.id }),
  });

  const { mutate, isPending } = useMutation({ mutationFn: userService.updateUserById });

  const methods = useForm({
    // resolver: yupResolver(validationLoginSchema),
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
        // reset()
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "An error occurred during login");
      },
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Xử lý logic tạo/chỉnh sửa thành viên ở đây
  //   console.log("Dữ liệu thành viên:", formData);
  //   onClose();
  // };

  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
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
                <Label htmlFor="name">Họ và Tên</Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.name}</p>
                ) : (
                  <Input
                    id={FORM_SIGN.username}
                    {...register(FORM_SIGN.username)}
                    errorMessage={errors[FORM_SIGN.username]?.message?.toString()}
                    placeholder="Nhập họ và tên thành viên"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.email}>Email</Label>
                {isViewMode ? (
                  <p>
                    <Link href={`mailto:${member?.email}`} target="_blank" className="text-sm">
                      {member?.email}
                    </Link>
                  </p>
                ) : (
                  <Input
                    id={FORM_SIGN.email}
                    {...register(FORM_SIGN.email)}
                    errorMessage={errors[FORM_SIGN.email]?.message?.toString()}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={FORM_SIGN.codeStudent}>Mã số sinh viên</Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.studentId}</p>
                ) : (
                  <Input
                    id={FORM_SIGN.codeStudent}
                    {...register(FORM_SIGN.codeStudent)}
                    errorMessage={errors[FORM_SIGN.codeStudent]?.message?.toString()}
                    placeholder="20111111"
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Zalo)</Label>
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
                  <Input
                    id={FORM_SIGN.phone}
                    {...register(FORM_SIGN.phone)}
                    errorMessage={errors[FORM_SIGN.phone]?.message?.toString()}
                    placeholder="Nhập số điện thoại"
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
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
              {/* <Button type="button" variant="outline" onClick={onClose}>
              {isViewMode ? "Đóng" : "Hủy"}
            </Button> */}
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
