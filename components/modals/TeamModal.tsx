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

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  team?: {
    id: number;
    name: string;
    lead: string;
    status: string;
    description?: string;
  };
}

export default function TeamModal({ isOpen, onClose, mode, team }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    lead: team?.lead || "",
    status: team?.status || "Active",
    description: team?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic tạo/chỉnh sửa nhóm ở đây
    console.log("Dữ liệu nhóm:", formData);
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
          <DialogTitle>{mode === "create" ? "Tạo Nhóm Mới" : "Chỉnh Sửa Nhóm"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Tạo một nhóm mới cho câu lạc bộ công nghệ"
              : "Cập nhật thông tin nhóm"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên Nhóm</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập tên nhóm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead">Trưởng Nhóm</Label>
            <Select
              value={formData.lead}
              onValueChange={(value) => setFormData({ ...formData, lead: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trưởng nhóm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                <SelectItem value="Michael Rodriguez">Michael Rodriguez</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                <SelectItem value="Active">Hoạt Động</SelectItem>
                <SelectItem value="On Hold">Tạm Dừng</SelectItem>
                <SelectItem value="Completed">Hoàn Thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả nhóm"
              required
            />
          </div>
          <DialogFooter>
            {/* <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button> */}
            <Button type="submit">{mode === "create" ? "Tạo Nhóm" : "Lưu Thay Đổi"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
