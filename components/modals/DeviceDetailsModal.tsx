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
import { Badge } from "@/components/ui/badge";
import { Calendar, Laptop, CheckCircle2 } from "lucide-react";

interface DeviceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: {
    id: number;
    name: string;
    type: string;
    status: string;
    assignedTo: string;
    lastChecked: string;
    condition: string;
    specifications?: string;
  };
  isAdmin: boolean;
  onEdit?: () => void;
}

export default function DeviceDetailsModal({
  isOpen,
  onClose,
  device,
  isAdmin,
  onEdit,
}: DeviceDetailsModalProps) {
  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Laptop className="h-5 w-5" />
              <span>{device.name}</span>
            </div>
            <Badge
              variant={
                device.status === "Available"
                  ? "default"
                  : device.status === "Pending Approval"
                  ? "secondary"
                  : "outline"
              }
            >
              {device.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Chi tiết và thông tin thiết bị</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Loại</h4>
              <p className="text-sm">{device.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Tình trạng</h4>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">{device.condition}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Phân công hiện tại</h4>
            <p className="text-sm">
              {device.assignedTo === "-" ? "Chưa được phân công" : device.assignedTo}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Kiểm tra lần cuối: {device.lastChecked}</span>
          </div>

          {device.specifications && (
            <div>
              <h4 className="text-sm font-medium mb-1">Thông số kỹ thuật</h4>
              <p className="text-sm text-muted-foreground">{device.specifications}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {/* <Button variant="outline" onClick={onClose}>
            Đóng
          </Button> */}
          {isAdmin && <Button onClick={onEdit}>Quản lý thiết bị</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
