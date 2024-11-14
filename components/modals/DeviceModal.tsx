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
import { useMutation, useQuery } from "@tanstack/react-query";
import deviceService from "@/services/device-service";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FORM_DEVICE } from "@/constants/device";
import { toast } from "sonner";

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  device?: {
    id: number;
    name: string;
    type: string;
    status: string;
    condition: string;
    notes?: string;
  };
}

export default function DeviceModal({ isOpen, onClose, mode, device }: DeviceModalProps) {
  const [formData, setFormData] = useState({
    name: device?.name || "",
    type: device?.type || "",
    status: device?.status || "Available",
    condition: device?.condition || "Good",
    notes: device?.notes || "",
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-manager`],
    queryFn: () => deviceService.getDeviceById({ id: device?.id?.toString() || "" }),
  });

  const { mutate, isPending } = useMutation({ mutationFn: deviceService.updateDeviceById });
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

  const isFormValid = watch(FORM_DEVICE.name);
  const isSubmitDisabled = isPending || !isFormValid;

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    mutate(data, {
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
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>{isCreateMode ? "Thêm Thiết Bị Mới" : "Chỉnh Sửa Thiết Bị"}</DialogTitle>
          <DialogDescription>
            {isCreateMode ? "Thêm một thiết bị mới vào kho" : "Cập nhật thông tin thiết bị"}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={FORM_DEVICE.name}>Tên Thiết Bị</Label>
              <Input
                id={FORM_DEVICE.name}
                {...register(FORM_DEVICE.name)}
                errorMessage={errors[FORM_DEVICE.name]?.message?.toString()}
                placeholder="Nhập tên thiết bị"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={FORM_DEVICE.type}>Loại Thiết Bị</Label>
                <Controller
                  name={FORM_DEVICE.type}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Loại thiết bị là bắt buộc" }}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại thiết bị" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laptop">Laptop</SelectItem>
                        <SelectItem value="Cable">Dây cáp</SelectItem>
                        <SelectItem value="Projector">Máy chiếu</SelectItem>
                        <SelectItem value="Mobile Device">Thiết Bị Di Động</SelectItem>
                        <SelectItem value="Other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_DEVICE.type] && (
                  <span>{errors?.[FORM_DEVICE.type]?.message?.toString()}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={FORM_DEVICE.status}>Trạng Thái</Label>
                <Controller
                  name={FORM_DEVICE.status}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Tình trạng là bắt buộc" }}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Có Sẵn</SelectItem>
                        <SelectItem value="In Use">Đang Sử Dụng</SelectItem>
                        <SelectItem value="Maintenance">Bảo Trì</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_DEVICE.status] && (
                  <span>{errors?.[FORM_DEVICE.status]?.message?.toString()}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={FORM_DEVICE.condition}>Tình Trạng</Label>
                <Controller
                  name={FORM_DEVICE.condition}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Tình trạng là bắt buộc" }}
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">Mới</SelectItem>
                        <SelectItem value="Used">Đã Sử Dụng</SelectItem>
                        <SelectItem value="Damaged">Hư Hỏng</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_DEVICE.condition] && (
                  <span>{errors?.[FORM_DEVICE.condition]?.message?.toString()}</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Ghi Chú</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Nhập bất kỳ ghi chú bổ sung nào về thiết bị"
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isCreateMode ? "Thêm Thiết Bị" : "Lưu Thay Đổi"}</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
