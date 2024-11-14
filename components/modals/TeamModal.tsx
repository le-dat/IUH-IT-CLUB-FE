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

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  team?: {
    id: number;
    name: string;
    lead: string;
    status: string;
    description?: string;
  };
}

export default function TeamModal({ isOpen, onClose, mode, team }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    lead: team?.lead || "",
    status: team?.status || "Active",
    description: team?.description || "",
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`team-${team?.id}`],
    queryFn: () => teamService.getTeamById({ id: team?.id?.toString() || "" }),
  });

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: teamService.createTeam,
  });
  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: teamService.updateTeamById,
  });
  const isCreateMode = mode === "create";

  const methods = useForm();

  const {
    watch,
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_TEAM.name);
  const isSubmitDisabled = isPendingCreate || isPendingUpdate || !isFormValid;

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    if (isCreateMode) {
      handleCreate(data, {
        onSuccess: (response) => {
          toast.success(response?.message);
          console.log("response: ", response);
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      });
    } else {
      handleUpdate(data, {
        onSuccess: (response) => {
          toast.success(response?.message);
          console.log("response: ", response);
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      });
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.name}>Tên Nhóm</Label>
              <Input
                id={FORM_TEAM.name}
                {...register(FORM_TEAM.name)}
                placeholder="Nhập tên nhóm"
                required
              />
              {errors[FORM_TEAM.name] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_TEAM.name]?.message?.toString()}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.leader}>Trưởng Nhóm</Label>
              <Controller
                name={FORM_TEAM.leader}
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
            </div>
            <div className="space-y-2">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.description}>Mô Tả</Label>
              <Textarea
                id={FORM_TEAM.description}
                value={formData.description}
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
