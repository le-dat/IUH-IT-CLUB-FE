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
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FORM_SIGN } from "@/constants/auth";
import { FORM_USER } from "@/constants/user";
import { IUser } from "@/types/user-type";
import { validationUserSchema } from "@/lib/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
  member?: IUser;
  isAdmin: boolean;
  refetch?: () => void;
}

export default function MemberModal({
  isOpen,
  onClose,
  mode,
  member,
  isAdmin,
  refetch,
}: MemberModalProps) {
  const isViewMode = mode === "view";
  const canEdit = isAdmin && mode !== "view";

  const { mutate: mutateCreateUser, isPending: isPendingCreateUser } = useMutation({
    mutationFn: userService.createUser,
  });
  const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } = useMutation({
    mutationFn: userService.updateUserById,
  });

  const methods = useForm({
    resolver: yupResolver(validationUserSchema),
    defaultValues: {
      username: member?.username || "",
      email: member?.email || "",
      level: member?.level || "",
      phone: member?.phone || "",
    },
  });

  const {
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const isFormValid =
    watch(FORM_USER.email) &&
    watch(FORM_USER.level) &&
    watch(FORM_USER.phone) &&
    watch(FORM_USER.username);
  const isSubmitDisabled = isPendingCreateUser || isPendingUpdateUser || !isFormValid;

  const onErrors = (errors: any) => console.error(errors);

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    if (mode === "edit") {
      mutateUpdateUser(
        { id: member?._id as string, data },
        {
          onSuccess: (response) => {
            refetch && refetch();
            toast.success(response?.message);
            handleClose();
          },
          onError: (error) => {
            console.error(error);
            toast.error(error?.message || "Đã có lỗi xảy ra");
          },
        }
      );
    } else {
      mutateCreateUser(data, {
        onSuccess: (response) => {
          refetch && refetch();
          toast.success(response?.message);
          handleClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (member && mode === "edit") {
      reset({
        username: member?.username,
        email: member?.email,
        level: member?.level,
        phone: member?.phone,
      });
    }
  }, [member, mode, reset]);

  return (
    <FormProvider {...methods}>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogCloseButton onClick={handleClose} />
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

          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label className="text-indigo-400" htmlFor={FORM_USER.username}>
                  Họ và Tên
                </Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.username}</p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.username}
                      {...register(FORM_USER.username)}
                      placeholder="Nhập họ và tên thành viên"
                      required
                    />
                    {errors[FORM_USER.username] && (
                      <div className="text-red-500 !mt-2">
                        {errors?.[FORM_USER.username]?.message?.toString()}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className=" space-y-2">
                <Label className="text-indigo-400" htmlFor={FORM_SIGN.email}>
                  Email
                </Label>

                {isViewMode ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`mailto:${member?.email}`}
                        target="_blank"
                        className="text-sm hover:underline hover:italic block w-fit"
                      >
                        {member?.email}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-yellow-500">
                      <span>Gửi email cho </span>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.email}
                      {...register(FORM_USER.email)}
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                    {errors[FORM_USER.email] && (
                      <div className="text-red-500 !mt-2">
                        {errors?.[FORM_USER.email]?.message?.toString()}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-indigo-400" htmlFor={FORM_SIGN.level}>
                  Khóa học
                </Label>
                {isViewMode ? (
                  <p className="text-sm">{member?.level}</p>
                ) : (
                  <>
                    <Input
                      id={FORM_USER.level}
                      {...register(FORM_USER.level)}
                      placeholder="Khóa học là bắt buộc"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                    {errors[FORM_USER.level] && (
                      <div className="text-red-500 !mt-2">
                        {errors?.[FORM_USER.level]?.message?.toString()}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-indigo-400" htmlFor="phone">
                  Điện thoại
                </Label>
                {isViewMode ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://zalo.me/${member?.phone}`}
                        target="_blank"
                        className="text-sm hover:underline hover:italic block w-fit"
                      >
                        {member?.phone}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-yellow-500">
                      <span>Liên lạc bằng zalo </span>
                    </TooltipContent>
                  </Tooltip>
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
                      <div className="text-red-500 !mt-2">
                        {errors?.[FORM_USER.phone]?.message?.toString()}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {isViewMode && member?.forte && member?.forte?.length > 0 && (
              <div className="space-y-2">
                <Label className="text-indigo-400">Kỹ Năng</Label>
                <div className="flex gap-2 flex-wrap">
                  {member?.forte?.map((skill: string, index: number) => (
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
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
