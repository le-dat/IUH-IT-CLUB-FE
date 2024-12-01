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
import { ITeam } from "@/types/team-type";
import { IUser } from "@/types/user-type";
import { Eye } from "lucide-react";
import MemberModal from "./MemberModal";
import { useState } from "react";

interface TeamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: ITeam;
  isAdmin: boolean;
  onEdit?: () => void;
  refetch?: () => void;
}

export default function TeamDetailsModal({
  isOpen,
  onClose,
  team,
  isAdmin,
  onEdit,
  refetch,
}: TeamDetailsModalProps) {
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
          <DialogCloseButton onClick={onClose} />{" "}
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-2 pr-6">
              <span className="line-clamp-2">{team?.teamName}</span>
            </DialogTitle>
            <DialogDescription>{team.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Trưởng Nhóm</h4>
              <p className="text-sm">{team?.teamLeader?.username}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Thành viên ({team?.members?.length})</h4>
              <ul className="max-h-48 space-y-2 overflow-y-auto">
                {/* fake team data */}
                {Array(10)
                  .fill({})
                  .map((member, index) => (
                    <li key={index} className="flex justify-between transition-all items-center">
                      <span>Alex Johnson</span>
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

            <div className="grid grid-cols-2 gap-4">
              {/* <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{team.projects} Dự án</span>
            </div> */}
            </div>
          </div>
          <DialogFooter>{isAdmin && <Button onClick={onEdit}>Quản lý nhóm</Button>}</DialogFooter>
        </DialogContent>
      </Dialog>

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={"view"}
        member={selectedMember!}
        isAdmin={isAdmin}
        refetch={refetch}
      />
    </>
  );
}
