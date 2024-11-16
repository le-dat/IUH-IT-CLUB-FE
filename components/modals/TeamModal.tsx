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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import teamService from "@/services/team-service";
import { FORM_TEAM } from "@/constants/team";
import { toast } from "sonner";
import { ITeam } from "@/types/team-type";
import { validationTeamSchema } from "@/lib/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import useTeamStore from "@/store/team-store";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  team: ITeam;
  refetch?: () => void;
}

export default function TeamModal({ isOpen, onClose, mode, team, refetch }: TeamModalProps) {
  const isCreateMode = mode === "create";

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: teamService.createTeam,
  });
  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: teamService.updateTeamById,
  });

  const methods = useForm({
    resolver: yupResolver(validationTeamSchema),
    defaultValues: {
      [FORM_TEAM.teamName]: team?.teamName || "",
      [FORM_TEAM.description]: team?.description || "",
      // [FORM_TEAM.status]: team?.status || "",
      // [FORM_TEAM.teamLeader]: team?.teamLeader
    },
  });

  const {
    watch,
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_TEAM.teamName) && watch(FORM_TEAM.description);
  const isSubmitDisabled = isPendingCreate || isPendingUpdate || !isFormValid;

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    // if (isCreateMode) {
    //   handleCreate(data, {
    //     onSuccess: (response) => {
    //       console.log("response: ", response);
    //       refetch && refetch();
    //       toast.success(response?.message);
    //       onClose();
    //     },
    //     onError: (error) => {
    //       console.error(error);
    //                 toast.error(error?.message || "Đã có lỗi xảy ra");

    //     },
    //   });
    // } else {
    //   handleUpdate(data, {
    //     onSuccess: (response) => {
    //       console.log("response: ", response);
    //       refetch && refetch();
    //       toast.success(response?.message);
    //       onClose();
    //     },
    //     onError: (error) => {
    //       console.error(error);
    //                 toast.error(error?.message || "Đã có lỗi xảy ra");

    //     },
    //   });
    // }
  };
  const onErrors = (errors: any) => console.error(errors);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>{isCreateMode ? "Tạo Nhóm Mới" : "Chỉnh Sửa Nhóm"}</DialogTitle>
          <DialogDescription>
            {isCreateMode ? "Tạo một nhóm mới cho câu lạc bộ công nghệ" : "Cập nhật thông tin nhóm"}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.teamName}>Tên Nhóm</Label>
              <Input
                id={FORM_TEAM.teamName}
                {...register(FORM_TEAM.teamName)}
                placeholder="Nhập tên nhóm"
                required
              />
              {errors[FORM_TEAM.teamName] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_TEAM.teamName]?.message?.toString()}
                </span>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.teamLeader}>Trưởng Nhóm</Label>
              <Controller
                name={FORM_TEAM.teamLeader}
                control={control}
                defaultValue=""
                rules={{ required: "Trưởng nhóm là bắt buộc" }}
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trưởng nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                      <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                      <SelectItem value="Michael Rodriguez">Michael Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors[FORM_TEAM.leader] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_TEAM.leader]?.message?.toString()}
                </span>
              )}
            </div> */}
            {/* <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.status}>Trạng Thái</Label>
              <Controller
                name={FORM_TEAM.status}
                control={control}
                defaultValue=""
                rules={{ required: "Trạng thái là bắt buộc" }}
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Hoạt Động</SelectItem>
                      <SelectItem value="On Hold">Tạm Dừng</SelectItem>
                      <SelectItem value="Completed">Hoàn Thành</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors[FORM_TEAM.status] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_TEAM.status]?.message?.toString()}
                </span>
              )}
            </div> */}
            <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.description}>Mô Tả</Label>
              <Textarea
                id={FORM_TEAM.description}
                {...register(FORM_TEAM.description)}
                placeholder="Nhập mô tả nhóm"
                required
              />
              {errors[FORM_TEAM.description] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_TEAM.description]?.message?.toString()}
                </span>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">{isCreateMode ? "Tạo Nhóm" : "Lưu Thay Đổi"}</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
