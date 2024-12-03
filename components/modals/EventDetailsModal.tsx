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
import { Calendar, MapPin, Users, Clock, Eye } from "lucide-react";
import { IEvent } from "@/types/event-type";
import { REQUEST_EVENT_TRANSLATE } from "@/constants/event";
import { formatDate } from "@/lib/utils";
import { IUser } from "@/types/user-type";
import { useState } from "react";
import MemberModal from "./MemberModal";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: IEvent;
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
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAction = (member: IUser, mode: "view" | "edit") => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogCloseButton onClick={onClose} />
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-2 pr-6">
              <span className="line-clamp-2">{event.eventName}</span>
              {/* <Badge
              variant={
                event.statusEvent === "upcoming"
                  ? "secondary"
                  : event.statusEvent === "passed"
                  ? "default"
                  : "destructive"
              }
              className="shrink-0"
            >
              {REQUEST_EVENT_TRANSLATE[event.statusEvent]}
            </Badge> */}
            </DialogTitle>
            <DialogDescription>Chi tiết và thông tin sự kiện</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Mô tả</h4>
              <p className="text-sm text-muted-foreground pl-3">{event.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(event?.eventDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                  <span className="text-sm">{event?.startTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{event.location}</span>
              </div>
              {/* <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{event.attendees} Người tham dự</span>
            </div> */}
            </div>
            {event.host && (
              <div className="space-y-2">
                <p className="text-sm font-medium ">Yêu cầu bởi</p>
                <p className="text-sm text-amber-500 pl-3">{event?.host?.username}</p>
              </div>
            )}
            {event?.registeredParticipants?.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium ">
                  Người tham gia ({event?.registeredParticipants?.length})
                </span>
                <ul className="max-h-48 space-y-2 overflow-y-auto pl-3">
                  {event?.registeredParticipants?.map((member, index) => (
                    <li key={index} className="flex justify-between transition-all items-center">
                      <span>{member?.username}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleAction(member, "view")}
                          type="button"
                          variant="ghost"
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* <DialogFooter>
            {isAdmin && event.statusEvent !== "upcoming" && (
              <Button onClick={onEdit}>Chỉnh sửa sự kiện</Button>
            )}
          </DialogFooter> */}
        </DialogContent>
      </Dialog>

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={"view"}
        member={selectedMember!}
        isAdmin={isAdmin}
      />
    </>
  );
}
