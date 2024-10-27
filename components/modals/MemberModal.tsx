"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
  member?: any;
  isAdmin: boolean;
}

export default function MemberModal({ isOpen, onClose, mode, member, isAdmin }: MemberModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    phone: member?.phone || "",
    // role: member?.role || "",
    // team: member?.team || "",
    // status: member?.status || "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic tạo/chỉnh sửa thành viên ở đây
    console.log("Dữ liệu thành viên:", formData);
    onClose();
  };

  const isViewMode = mode === "view";
  const canEdit = isAdmin && mode !== "view";

  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Thêm Thành Viên Mới"
              : mode === "edit"
              ? "Chỉnh Sửa Thành Viên"
              : "Chi Tiết Thành Viên"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Thêm một thành viên mới vào câu lạc bộ công nghệ"
              : mode === "edit"
              ? "Cập nhật thông tin thành viên"
              : "Xem chi tiết thành viên"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và Tên</Label>
            {isViewMode ? (
              <p className="text-sm">{member?.name}</p>
            ) : (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập họ và tên thành viên"
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isViewMode ? (
              <p>
                <Link href={`mailto:${member?.email}`} target="_blank" className="text-sm">
                  {member?.email}
                </Link>
              </p>
            ) : (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Nhập địa chỉ email"
                required
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Zalo)</Label>
            {isViewMode ? (
              <p>
                <Link href={`https://zalo.me/${member?.phone}`} target="_blank" className="text-sm">
                  {member?.phone}
                </Link>
              </p>
            ) : (
              <Input
                id="phone"
                type="string"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
                required
              />
            )}
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="role">Vai Trò</Label>
            {isViewMode ? (
              <p className="text-sm">{member?.role}</p>
            ) : (
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Developer">Nhà Phát Triển</SelectItem>
                  <SelectItem value="Designer">Nhà Thiết Kế</SelectItem>
                  <SelectItem value="Project Manager">Quản Lý Dự Án</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div> */}

          {/* <div className="space-y-2">
            <Label htmlFor="team">Nhóm</Label>
            {isViewMode ? (
              <p className="text-sm">{member?.team}</p>
            ) : (
              <Select
                value={formData.team}
                onValueChange={(value) => setFormData({ ...formData, team: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Dev">Phát Triển Web</SelectItem>
                  <SelectItem value="UI/UX">Thiết Kế UI/UX</SelectItem>
                  <SelectItem value="Mobile">Phát Triển Di Động</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div> */}

          {isViewMode && member?.skills && (
            <div className="space-y-2">
              <Label>Kỹ Năng</Label>
              <div className="flex gap-2 flex-wrap">
                {member.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            {/* <Button type="button" variant="outline" onClick={onClose}>
              {isViewMode ? "Đóng" : "Hủy"}
            </Button> */}
            {canEdit && (
              <Button type="submit">
                {mode === "create" ? "Thêm Thành Viên" : "Lưu Thay Đổi"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
