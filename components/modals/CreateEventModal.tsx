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

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  event?: any;
  mode: "create" | "edit";
}

export default function EventModal({ isOpen, onClose, isAdmin, event, mode }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    description: event?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic tạo sự kiện ở đây
    // Nếu isAdmin là true, tạo trực tiếp; nếu không, gửi để phê duyệt
    console.log("Dữ liệu sự kiện:", formData);
    onClose();
  };

  const title =
    mode === "edit" ? "Chỉnh sửa sự kiện" : isAdmin ? "Tạo Sự Kiện Mới" : "Đề Xuất Sự Kiện Mới";

  const description =
    mode === "edit"
      ? "Thay đổi thông tin sự kiện"
      : isAdmin
      ? "Tạo một sự kiện mới cho câu lạc bộ công nghệ"
      : "Gửi đề xuất sự kiện để quản trị viên phê duyệt";

  const buttonTitle = mode === "edit" ? "Lưu Thay Đổi" : isAdmin ? "Tạo Sự Kiện" : "Gửi Đề Xuất";

  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu Đề Sự Kiện</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nhập tiêu đề sự kiện"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Ngày</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Thời Gian</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Địa Điểm</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Nhập địa điểm sự kiện"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả sự kiện"
              required
            />
          </div>
          <DialogFooter>
            {/* <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button> */}
            <Button type="submit">{buttonTitle}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
