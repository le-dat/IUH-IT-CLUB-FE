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
import { Users, FolderGit2 } from "lucide-react";

interface TeamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: {
    id: number;
    name: string;
    members: number;
    projects: number;
    lead: string;
    status: string;
    description?: string;
  };
  isAdmin: boolean;
  onEdit?: () => void;
}

export default function TeamDetailsModal({
  isOpen,
  onClose,
  team,
  isAdmin,
  onEdit,
}: TeamDetailsModalProps) {
  return (
    <Dialog
      open={isOpen}
      //  onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />{" "}
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{team.name}</span>
            <Badge variant="secondary">{team.status}</Badge>
          </DialogTitle>
          <DialogDescription>Chi tiết và thông tin nhóm</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Trưởng Nhóm</h4>
            <p className="text-sm">{team.lead}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{team.members} Thành viên</span>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{team.projects} Dự án</span>
            </div>
          </div>

          {team.description && (
            <div>
              <h4 className="text-sm font-medium mb-2">Mô tả</h4>
              <p className="text-sm text-muted-foreground">{team.description}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {/* <Button variant="outline" onClick={onClose}>
            Đóng
          </Button> */}
          {isAdmin && <Button onClick={onEdit}>Quản lý nhóm</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
