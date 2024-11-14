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
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    status: string;
    description: string;
    requester?: string;
  };
  isAdmin: boolean;
  onEdit?: () => void;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
  isAdmin,
  onEdit,
}: EventDetailsModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogCloseButton onClick={onClose} />
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2 pr-6">
            <span className="line-clamp-2">{event.title}</span>
            <Badge
              variant={
                event.status === "Pending Approval"
                  ? "secondary"
                  : event.status === "Approved"
                  ? "default"
                  : "destructive"
              }
              className="shrink-0"
            >
              {event.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Chi tiết và thông tin sự kiện</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Mô tả</h4>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{event.date}</span>
              <Clock className="h-4 w-4 text-muted-foreground ml-2" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{event.attendees} Người tham dự</span>
            </div>
          </div>

          {event.requester && (
            <div>
              <h4 className="text-sm font-medium mb-2">Yêu cầu bởi</h4>
              <p className="text-sm">{event.requester}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {isAdmin && event.status !== "Pending Approval" && (
            <Button onClick={onEdit}>Chỉnh sửa sự kiện</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
