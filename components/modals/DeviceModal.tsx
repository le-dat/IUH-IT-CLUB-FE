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
    condition: device?.condition || "Excellent",
    notes: device?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic tạo/chỉnh sửa thiết bị ở đây
    console.log("Dữ liệu thiết bị:", formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Thêm Thiết Bị Mới" : "Chỉnh Sửa Thiết Bị"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Thêm một thiết bị mới vào kho" : "Cập nhật thông tin thiết bị"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên Thiết Bị</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên thiết bị"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Loại Thiết Bị</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại thiết bị" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Development Board">Bảng Phát Triển</SelectItem>
                <SelectItem value="Mobile Device">Thiết Bị Di Động</SelectItem>
                <SelectItem value="Other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Trạng Thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Có Sẵn</SelectItem>
                  <SelectItem value="In Use">Đang Sử Dụng</SelectItem>
                  <SelectItem value="Maintenance">Bảo Trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Tình Trạng</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tình trạng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Xuất Sắc</SelectItem>
                  <SelectItem value="Good">Tốt</SelectItem>
                  <SelectItem value="Fair">Khá</SelectItem>
                  <SelectItem value="Poor">Kém</SelectItem>
                </SelectContent>
              </Select>
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
            {/* <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button> */}
            <Button type="submit">{mode === "create" ? "Thêm Thiết Bị" : "Lưu Thay Đổi"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
