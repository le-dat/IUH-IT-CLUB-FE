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

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "event" | "device";
  item: {
    id: number;
    title?: string;
    requester?: string;
    details?: string;
    date?: string;
    time?: string;
    location?: string;
    deviceName?: string;
    startDate?: string;
    endDate?: string;
    purpose?: string;
  };
}

export default function ApprovalModal({ isOpen, onClose, type, item }: ApprovalModalProps) {
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    console.log("Đã phê duyệt:", { type, item, notes });
    onClose();
  };

  const handleReject = () => {
    console.log("Đã từ chối:", { type, item, notes });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      // onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>
            {type === "event" ? "Phê duyệt yêu cầu sự kiện" : "Phê duyệt yêu cầu thiết bị"}
          </DialogTitle>
          <DialogDescription>Xem xét yêu cầu {type} và đưa ra quyết định của bạn</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Chi tiết yêu cầu</h4>
            <div className="bg-muted p-4 rounded-lg space-y-3">
              {type === "event" ? (
                <>
                  <div>
                    <h5 className="font-medium">{item.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {item.date} lúc {item.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      <h5 className="font-medium">{item.deviceName}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.purpose}</p>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Ngày bắt đầu: {item.startDate}</div>
                    <div>Ngày kết thúc: {item.endDate}</div>
                  </div>
                </>
              )}
              <div className="pt-2 border-t">
                <Badge variant="outline">Yêu cầu bởi {item.requester}</Badge>
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
          {/* <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button> */}
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
