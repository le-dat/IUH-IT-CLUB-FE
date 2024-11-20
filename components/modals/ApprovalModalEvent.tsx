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
import { formatDateTime } from "@/lib/utils/date";
import { useMutation } from "@tanstack/react-query";
import eventService from "@/services/event-service";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validationEventSchema } from "@/lib/validate";

interface ApprovalModalEventProps {
  isOpen: boolean;
  onClose: () => void;
  item: IEvent;
  refetch?: () => void;
}

export default function ApprovalModalEvent({
  isOpen,
  onClose,
  item,
  refetch,
}: ApprovalModalEventProps) {
  // const [notes, setNotes] = useState("");

  const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent } = useMutation({
    mutationFn: eventService.updateEventById,
  });

  const handleClose = () => {
    onClose();
  };

  const handleApprove = () => {
    const data = { id: item._id, data: { ...item, status: "approved" } };
    mutateUpdateEvent(data, {
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
    const data = { id: item._id, data: { ...item, status: "rejected" } };
    mutateUpdateEvent(data, {
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
          <DialogTitle>Phê duyệt yêu cầu sự kiện</DialogTitle>
          <DialogDescription>
            Xem xét yêu cầu sự kiện và đưa ra quyết định của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Chi tiết yêu cầu</h4>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div>
                <h5 className="font-medium">{item.eventName}</h5>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDateTime(item.eventDate)} lúc {item.startTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="pt-2 border-t">
                <Badge variant="outline">Yêu cầu bởi {item?.host?.username}</Badge>
              </div>
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú của quản trị viên</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thêm bất kỳ ghi chú hoặc phản hồi nào về quyết định của bạn"
            />
          </div> */}
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
