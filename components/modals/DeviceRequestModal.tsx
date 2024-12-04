"use client";

import { useState, useEffect } from "react";
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
import { Calendar } from "lucide-react";
import { format, addDays, isBefore, isAfter } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import eventService from "@/services/event-service";
import deviceService from "@/services/device-service";
import { toast } from "sonner";
import { IDevice } from "@/types/device-type";

interface DeviceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;
  device: IDevice;
}

export default function DeviceRequestModal({ isOpen, onClose, refetch, device }: DeviceRequestModalProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    purpose: "",
  });

  const [dateErrors, setDateErrors] = useState({
    startDate: "",
    endDate: "",
  });
  const { mutate: handleRequestDeviceById, isPending: isRegisterDelete } = useMutation({
    mutationFn: deviceService.requestDeviceById,
  });

  // Tính toán giới hạn ngày
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const maxStartDate = format(addDays(tomorrow, 2), "yyyy-MM-dd");

  useEffect(() => {
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const maxEndDate = addDays(startDate, 14);

      if (formData.endDate) {
        const endDate = new Date(formData.endDate);
        if (isAfter(endDate, maxEndDate)) {
          setFormData((prev) => ({ ...prev, endDate: format(maxEndDate, "yyyy-MM-dd") }));
        }
      }
    }
  }, [formData.startDate]);

  const validateDates = (startDate: string, endDate: string) => {
    const errors = {
      startDate: "",
      endDate: "",
    };

    if (startDate) {
      const start = new Date(startDate);
      const maxStart = new Date(maxStartDate);

      if (isBefore(start, tomorrow)) {
        errors.startDate = "Ngày bắt đầu không thể là ngày trong quá khứ";
      } else if (isAfter(start, maxStart)) {
        errors.startDate = "Ngày bắt đầu phải trong vòng 2 ngày kể từ hôm nay";
      }
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const maxEnd = addDays(start, 14);

      if (isBefore(end, start)) {
        errors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
      } else if (isAfter(end, maxEnd)) {
        errors.endDate = "Thời gian mượn tối đa là 2 tuần";
      }
    }

    return errors;
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    const errors = validateDates(
      field === "startDate" ? value : formData.startDate,
      field === "endDate" ? value : formData.endDate
    );
    setDateErrors(errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateDates(formData.startDate, formData.endDate);

    if (errors.startDate || errors.endDate) {
      setDateErrors(errors);
      return;
    }

    handleRequestDeviceById(
      {
        id: device._id as string,
        data: {
          ...device,
          borrowDate: formData.startDate,
          returnDate: formData.endDate,
          purpose: formData.purpose,
        },
      },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setFormData({ startDate: "", endDate: "", purpose: "" });
          refetch && refetch();
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      }
    );
  };

  const onErrors = (errors: any) => console.error(errors);
  

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>Yêu Cầu Thiết Bị <span className="italic text-amber-600">&#39;{device?.name}&#39;</span></DialogTitle>
          <DialogDescription>
             Thời gian mượn tối đa là 2 tuần.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Ngày Bắt Đầu</Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleDateChange("startDate", e.target.value)}
                  min={format(tomorrow, "yyyy-MM-dd")}
                  max={maxStartDate}
                  className={`pl-8 ${dateErrors.startDate ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {dateErrors.startDate && (
                <p className="text-sm text-red-500">{dateErrors.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Ngày Kết Thúc</Label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleDateChange("endDate", e.target.value)}
                  min={formData.startDate || format(tomorrow, "yyyy-MM-dd")}
                  max={
                    formData.startDate
                      ? format(addDays(new Date(formData.startDate), 14), "yyyy-MM-dd")
                      : undefined
                  }
                  className={`pl-8 ${dateErrors.endDate ? "border-red-500" : ""}`}
                  required
                  disabled={!formData.startDate}
                />
              </div>
              {dateErrors.endDate && <p className="text-sm text-red-500">{dateErrors.endDate}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Mục Đích Sử Dụng</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Giải thích lý do bạn cần thiết bị này và cách bạn dự định sử dụng nó"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!!dateErrors.startDate || !!dateErrors.endDate}>
              Gửi Yêu Cầu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
