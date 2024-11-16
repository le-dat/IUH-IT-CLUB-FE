"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationEventSchema } from "@/lib/validate";
import eventService from "@/services/event-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FORM_EVENT } from "@/constants/event";
import { IEvent } from "@/types/event-type";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  event?: IEvent;
  mode: "create" | "edit";
  refetch?: () => void;
}

export default function EventModal({
  isOpen,
  onClose,
  isAdmin,
  event,
  mode,
  refetch,
}: EventModalProps) {
  const { mutate: mutateCreateEvent, isPending: isPendingCreateEvent } = useMutation({
    mutationFn: eventService.createEvent,
  });
  const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent } = useMutation({
    mutationFn: eventService.updateEvent,
  });

  const methods = useForm({
    resolver: yupResolver(validationEventSchema),
    defaultValues: {},
  });

  const {
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const isFormValid =
    Object.keys(errors).length === 0 &&
    watch(FORM_EVENT.eventName) &&
    watch(FORM_EVENT.description);
  const isSubmitDisabled = isPendingCreateEvent || isPendingUpdateEvent || !isFormValid;

  const onErrors = (errors: any) => console.error(errors);

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    if (mode === "edit") {
      mutateUpdateEvent(data, {
        onSuccess: (response) => {
          refetch && refetch();
          toast.success(response?.message);
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      });
    } else {
      mutateCreateEvent(data, {
        onSuccess: (response) => {
          refetch && refetch();
          toast.success(response?.message);
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      });
    }
  };
  const title =
    mode === "edit" ? "Chỉnh sửa sự kiện" : isAdmin ? "Tạo Sự Kiện Mới" : "Đề Xuất Sự Kiện Mới";

  const description =
    mode === "edit"
      ? "Thay đổi thông tin sự kiện"
      : isAdmin
      ? "Tạo một sự kiện mới cho câu lạc bộ công nghệ"
      : "Gửi đề xuất sự kiện để quản trị viên phê duyệt";

  const buttonTitle = mode === "edit" ? "Lưu Thay Đổi" : isAdmin ? "Tạo Sự Kiện" : "Gửi Đề Xuất";

  return (
    <FormProvider {...methods}>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogCloseButton onClick={onClose} />
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={FORM_EVENT.eventName}>Tiêu Đề Sự Kiện</Label>
              <Input
                id={FORM_EVENT.eventName}
                {...register(FORM_EVENT.eventName)}
                placeholder="Nhập tiêu đề sự kiện"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={FORM_EVENT.eventDate}>Ngày</Label>
                <Input
                  type="date"
                  id={FORM_EVENT.eventDate}
                  {...register(FORM_EVENT.eventDate)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_EVENT.time}>Thời Gian</Label>
                <Input type="time" id={FORM_EVENT.time} {...register(FORM_EVENT.time)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={FORM_EVENT.location}>Địa Điểm</Label>
              <Input
                id={FORM_EVENT.location}
                {...register(FORM_EVENT.location)}
                placeholder="Nhập địa điểm sự kiện"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={FORM_EVENT.description}>Mô Tả</Label>
              <Textarea
                id={FORM_EVENT.description}
                {...register(FORM_EVENT.description)}
                placeholder="Nhập mô tả sự kiện"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{buttonTitle}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
