"use client";

import { useEffect, useState } from "react";
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
import useAuthStore from "@/store/auth-store";
import { format, addDays, isBefore, isAfter } from "date-fns";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  event: IEvent | null;
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
  const today = new Date();
  const [minDate, setMinDate] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const maxStartDate = format(addDays(today, 30), "yyyy-MM-dd");

  const { mutate: mutateCreateEvent, isPending: isPendingCreateEvent } = useMutation({
    mutationFn: eventService.createEvent,
  });
  const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent } = useMutation({
    mutationFn: eventService.updateEventById,
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
    watch(FORM_EVENT.eventDate) &&
    watch(FORM_EVENT.startTime) &&
    watch(FORM_EVENT.location);

  const isSubmitDisabled = isPendingCreateEvent || isPendingUpdateEvent || !isFormValid;

  const onErrors = (errors: any) => console.error(errors);

  const onSubmit = async (data: any) => {
    const formatData = {
      ...data,
      statusEvent: "upcoming",
    };
    if (isSubmitDisabled) return;

    if (mode === "edit") {
      mutateUpdateEvent(
        { id: event?._id as string, data: formatData },
        {
          onSuccess: (response) => {
            refetch && refetch();
            toast.success(response?.message);
            onClose();
          },
          onError: (error) => {
            console.error(error);
            toast.error(error?.message || "Đã có lỗi xảy ra");
          },
        }
      );
    } else {
      mutateCreateEvent(formatData, {
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

  useEffect(() => {
    if (event && mode === "edit") {
      reset({
        eventName: event?.eventName,
        eventDate: new Date(event?.eventDate),
        startTime: event?.startTime,
        location: event?.location,
        description: event?.description,
      });
    }
  }, [event, mode, reset]);

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
              <Label htmlFor={FORM_EVENT.eventName} required>
                Tiêu Đề Sự Kiện
              </Label>
              <Input
                id={FORM_EVENT.eventName}
                {...register(FORM_EVENT.eventName)}
                placeholder="Nhập tiêu đề sự kiện"
                required
              />
              {errors[FORM_EVENT.eventName] && (
                <div className="text-red-500 !mt-2">
                  {errors?.[FORM_EVENT.eventName]?.message?.toString()}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={FORM_EVENT.eventDate} required>
                  Ngày
                </Label>
                <Input
                  type="date"
                  id={FORM_EVENT.eventDate}
                  {...register(FORM_EVENT.eventDate)}
                  required
                  min={format(minDate, "yyyy-MM-dd")}
                  max={maxStartDate}
                />
                {errors[FORM_EVENT.eventDate] && (
                  <div className="text-red-500 !mt-2">
                    {errors?.[FORM_EVENT.eventDate]?.message?.toString()}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_EVENT.startTime} required>
                  Thời Gian
                </Label>
                <Input
                  type="time"
                  id={FORM_EVENT.startTime}
                  {...register(FORM_EVENT.startTime)}
                  required
                  min="07:00"
                  max="21:00"
                />
                {errors[FORM_EVENT.startTime] && (
                  <div className="text-red-500 !mt-2">
                    {errors?.[FORM_EVENT.startTime]?.message?.toString()}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={FORM_EVENT.location} required>
                Địa Điểm
              </Label>
              <Input
                id={FORM_EVENT.location}
                {...register(FORM_EVENT.location)}
                placeholder="Nhập địa điểm sự kiện"
                required
              />
              {errors[FORM_EVENT.location] && (
                <div className="text-red-500 !mt-2">
                  {errors?.[FORM_EVENT.location]?.message?.toString()}
                </div>
              )}
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
