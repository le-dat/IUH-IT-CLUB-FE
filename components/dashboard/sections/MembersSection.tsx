"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import MemberTable from "./members/MemberTable";
import MemberModal from "@/components/modals/MemberModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import Pagination from "@/components/common/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

interface MembersSectionProps {
  isAdmin: boolean;
}

const ITEMS_PER_PAGE = 2;

const members = [
  {
    id: 1,
    name: "Le Dat",
    role: "Developer",
    team: "Web Dev",
    status: "Active",
    joinDate: "2024-01-15",
    email: "alex@example.com",
    phone: "0123456789",
    skills: ["React", "Node.js", "TypeScript"],
    schoolYear: "Năm nhất",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Quang Thao",
    role: "Developer",
    team: "Web Dev",
    status: "Active",
    joinDate: "2024-01-15",
    email: "alex@example.com",
    phone: "0123456789",
    skills: ["React", "Node.js", "TypeScript"],
    schoolYear: "Năm nhất",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "lex Johnson",
    role: "Developer",
    team: "Web Dev",
    status: "Active",
    joinDate: "2024-01-15",
    email: "alex@example.com",
    phone: "0123456789",
    skills: ["React", "Node.js", "TypeScript"],
    schoolYear: "Năm hai",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "lex Johnson",
    role: "Developer",
    team: "Web Dev",
    status: "Active",
    joinDate: "2024-01-15",
    email: "alex@example.com",
    phone: "0123456789",
    skills: ["React", "Node.js", "TypeScript"],
    schoolYear: "Năm ba",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop",
  },
];

export default function MembersSection({ isAdmin }: MembersSectionProps) {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesRole = selectedRole === "All Roles" || member.role === selectedRole;
    const matchesYear = selectedYear === "All Years" || member.schoolYear === selectedYear;
    const matchesSkill = selectedSkill === "All Skills" || member.skills.includes(selectedSkill);

    return matchesSearch && matchesYear && matchesSkill;
  });

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAction = (member: any, mode: "view" | "edit") => {
    setSelectedMember(member);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleDelete = (member: any) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting member:", selectedMember?.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("members.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {isAdmin && (
            <Button onClick={handleAddMember}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm thành viên
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {/* <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Roles">Tất cả vai trò</SelectItem>
                <SelectItem value="Developer">Lập trình viên</SelectItem>
                <SelectItem value="Designer">Thiết kế viên</SelectItem>
                <SelectItem value="Project Manager">Quản lý dự án</SelectItem>
              </SelectContent>
            </Select> */}

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Years">Tất cả năm</SelectItem>
                <SelectItem value="Freshman">Năm nhất</SelectItem>
                <SelectItem value="Sophomore">Năm hai</SelectItem>
                <SelectItem value="Junior">Năm ba</SelectItem>
                <SelectItem value="Năm nhất">Năm tư</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo kỹ năng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Skills">Tất cả kỹ năng</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="UI Design">UI Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length)}
            totalItems={filteredMembers.length}
            itemName="thành viên"
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <MemberTable
        members={paginatedMembers}
        isAdmin={isAdmin}
        onView={(member) => handleAction(member, "view")}
        onEdit={(member) => handleAction(member, "edit")}
        onDelete={handleDelete}
      />

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        member={selectedMember}
        isAdmin={isAdmin}
      />
      {selectedMember && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Xóa thành viên"
          description={`Bạn có chắc chắn muốn xóa thành viên ${selectedMember.name} khỏi câu lạc bộ? Hành động này không thể hoàn tác.`}
        />
      )}
    </div>
  );
}
