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
import { useMutation, useQuery } from "@tanstack/react-query";
import deviceService from "@/services/device-service";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FORM_DEVICE } from "@/constants/device";
import { toast } from "sonner";
import { IDevice } from "@/types/device-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationDeviceSchema } from "@/lib/validate";

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  device?: IDevice;
  refetch?: () => void;
}

export default function DeviceModal({ isOpen, onClose, mode, device, refetch }: DeviceModalProps) {
  const isCreateMode = mode === "create";

  // const [formData, setFormData] = useState({
  //   name: device?.name || "",
  //   type: device?.type || "",
  //   // status: device?.status || "Available",
  //   // condition: device?.condition || "Good",
  //   // notes: device?.notes || "",
  // });

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: [`user-manager`],
  //   queryFn: () => deviceService.getDeviceById({ id: device?._id?.toString() || "" }),
  // });

  const { mutate: mutateCreateDevice, isPending: isPendingCreateDevice } = useMutation({
    mutationFn: deviceService.createDevice,
  });
  const { mutate: mutateUpdateDevice, isPending: isPendingUpdateDevice } = useMutation({
    mutationFn: deviceService.updateDeviceById,
  });

  const methods = useForm({
    resolver: yupResolver(validationDeviceSchema),
    defaultValues: {
      [FORM_DEVICE.name]: device?.name || "",
      [FORM_DEVICE.type]: device?.type || "",
      [FORM_DEVICE.status]: device?.status || "",
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

  const isFormValid =
    watch(FORM_DEVICE.name) && watch(FORM_DEVICE.type) && watch(FORM_DEVICE.status);
  const isSubmitDisabled = isPendingCreateDevice || isPendingUpdateDevice || !isFormValid;
  const onErrors = (errors: any) => console.error(errors);

  const onSubmit = async (data: any) => {
    if (isSubmitDisabled) return;

    if (isCreateMode) {
      mutateCreateDevice(
        { data },
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
      const updatedData = {
        id: device?._id as string,
        data,
      };
      mutateUpdateDevice(updatedData, {
        onSuccess: (response) => {
          console.log("response: ", response);
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
    if (device && mode === "edit") {
      reset({
        [FORM_DEVICE.name]: device.name,
        [FORM_DEVICE.type]: device.type,
        [FORM_DEVICE.status]: device.status,
      });
    }
  }, [device, mode, reset]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={handleClose} />
        <DialogHeader>
          <DialogTitle>{isCreateMode ? "Thêm Thiết Bị Mới" : "Chỉnh Sửa Thiết Bị"}</DialogTitle>
          <DialogDescription>
            {isCreateMode ? "Thêm một thiết bị mới vào kho" : "Cập nhật thông tin thiết bị"}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={FORM_DEVICE.name}>Tên Thiết Bị</Label>
              <Input
                id={FORM_DEVICE.name}
                {...register(FORM_DEVICE.name)}
                placeholder="Nhập tên thiết bị"
                required
              />
              {errors[FORM_DEVICE.name] && (
                <span className="text-red-500 mt-2">
                  {errors?.[FORM_DEVICE.name]?.message?.toString()}
                </span>
              )}
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
                    <Select {...field} onValueChange={(value) => field.onChange(value)}>
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
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_DEVICE.type]?.message?.toString()}
                  </span>
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
                    <Select {...field} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Có sẵn</SelectItem>
                        <SelectItem value="in use">Đang sử dụng</SelectItem>
                        <SelectItem value="unavailable">Không có sẵn</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_DEVICE.status] && (
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_DEVICE.status]?.message?.toString()}
                  </span>
                )}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor={FORM_DEVICE.condition}>Tình Trạng</Label>
                <Controller
                  name={FORM_DEVICE.condition}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Tình trạng là bắt buộc" }}
                  render={({ field }) => (
                                       <Select {...field} onValueChange={(value) => field.onChange(value)}>

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
                  <span className="text-red-500 mt-2">
                    {errors?.[FORM_DEVICE.condition]?.message?.toString()}
                  </span>
                )}
              </div> */}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="notes">Ghi Chú</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Nhập bất kỳ ghi chú bổ sung nào về thiết bị"
              />
            </div> */}
            <DialogFooter>
              <Button type="submit">{isCreateMode ? "Thêm Thiết Bị" : "Lưu Thay Đổi"}</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
