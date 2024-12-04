"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Laptop } from "lucide-react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { IEvent } from "@/types/event-type";
import { IDevice } from "@/types/device-type";
import { formatDate } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import deviceService from "@/services/device-service";
import { toast } from "sonner";
interface ApprovalModalDeviceProps {
  isOpen: boolean;
  onClose: () => void;
  item: IDevice;
  refetch?: () => void;
}
export default function ApprovalModalDevice({
  isOpen,
  onClose,
  item,
  refetch,
}: ApprovalModalDeviceProps) {
  const [notes, setNotes] = useState<string>("");

  const { mutate: mutateApproveDevice, isPending: isPendingApproveDevice } = useMutation({
    mutationFn: deviceService.approveDeviceById,
  });
  const { mutate: mutateRejectDevice, isPending: isPendingRejectDevice } = useMutation({
    mutationFn: deviceService.rejectDeviceById,
  });

  const handleClose = () => {
    onClose();
  };
  const handleApprove = () => {
    const data = { id: item._id };
    mutateApproveDevice(data, {
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
  };

  const handleReject = () => {
    const data = { id: item._id };
    mutateRejectDevice(data, {
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
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>Phê duyệt yêu cầu thiết bị</DialogTitle>
          <DialogDescription>
            Xem xét yêu cầu thiết bị và đưa ra quyết định của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Chi tiết yêu cầu</h4>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  <h5 className="font-medium">{item.name}</h5>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.purpose}</p>
              </div>
              <div className="text-sm flex items-center justify-between flex-wrap">
                <div>Ngày bắt đầu: {formatDate(item.borrowDate as string)}</div>
                <div>Ngày kết thúc: {formatDate(item.returnDate as string)}</div>
              </div>
              {item?.purpose && (
                <div className="text-sm ">
                  <div>
                    <span className="underline">Ghi chú: </span>
                    {item?.purpose}
                  </div>
                </div>
              )}
              <div className="pt-2 border-t">
                <Badge variant="outline">Yêu cầu bởi {item?.currentBorrower?.username}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú của quản trị viên</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thêm bất kỳ ghi chú hoặc phản hồi nào về quyết định của bạn"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="destructive" onClick={handleReject}>
            Từ chối
          </Button>
          <Button type="button" onClick={handleApprove}>
            Phê duyệt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
