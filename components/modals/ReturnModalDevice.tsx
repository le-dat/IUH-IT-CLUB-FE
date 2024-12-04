"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { conditionsMap, FORM_DEVICE } from "@/constants/device";
import { formatDate } from "@/lib/utils";
import { validationReturnDeviceSchema } from "@/lib/validate";
import deviceService from "@/services/device-service";
import { IDevice } from "@/types/device-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Laptop } from "lucide-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ReturnModalDeviceProps {
  isOpen: boolean;
  onClose: () => void;
  item: IDevice;
  refetch?: () => void;
}
export default function ReturnModalDevice({
  isOpen,
  onClose,
  item,
  refetch,
}: ReturnModalDeviceProps) {
  const { mutate: mutateReturnDevice, isPending: isPendingReturnDevice } = useMutation({
    mutationFn: deviceService.confirmReturnDeviceById,
  });

  const handleClose = () => {
    onClose();
  };
  const methods = useForm({
    resolver: yupResolver(validationReturnDeviceSchema),
  });

  const {
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_DEVICE.statusHealth);

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    if (!isFormValid) return;

    const submitData = {
      id: item._id,
      data: data.statusHealth,
    };
    mutateReturnDevice(submitData, {
      onSuccess: (response) => {
        refetch && refetch();
        handleClose();
        reset();
        toast.success(response?.message);
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Đã có lỗi xảy ra");
      },
    });
  };
  const onErrors = (errors: any) => console.error(errors);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>Phê duyệt yêu cầu trả thiết bị</DialogTitle>
          <DialogDescription>
            Xác nhận trả thiết bị và cập nhật trạng thái cho yêu cầu này
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      <h5 className="font-medium">{item.name}</h5>
                    </div>
                    {item.purpose && (
                      <p className="text-sm text-muted-foreground mt-1">{item.purpose}</p>
                    )}
                  </div>
                  <div className="text-sm flex items-center justify-between flex-wrap">
                    <div>Ngày bắt đầu: {formatDate(item.borrowDate as string)}</div>
                    <div>Ngày kết thúc: {formatDate(item.returnDate as string)}</div>
                  </div>
                  <div className="pt-2 border-t">
                    <Badge variant="outline">Yêu cầu bởi {item?.currentBorrower?.username}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={FORM_DEVICE.statusHealth}>Tình Trạng</Label>
                <Controller
                  name={FORM_DEVICE.statusHealth}
                  control={control}
                  rules={{ required: "Tình trạng là bắt buộc" }}
                  render={({ field }) => (
                    <Select {...field} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(conditionsMap).map(([value, name]) => (
                          <SelectItem key={value} value={value}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[FORM_DEVICE.statusHealth] && (
                  <div className="text-red-500 !mt-2">
                    {errors?.[FORM_DEVICE.statusHealth]?.message?.toString()}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit">Phê duyệt</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
