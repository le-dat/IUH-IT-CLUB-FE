"use client";

import Pagination from "@/components/common/Pagination";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import MemberModal from "@/components/modals/MemberModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import MemberTable from "./members/MemberTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";
import teamService from "@/services/team-service";
import { IUser } from "@/types/user-type";

interface MembersSectionProps {
  isAdmin: boolean;
}

export default function MembersSection({ isAdmin }: MembersSectionProps) {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("All Years");
  const [selectedSkill, setSelectedSkill] = useState<string>("All Skills");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const debouncedSelectedYear = useDebounce(selectedYear, 500);
  const debouncedSelectedSkill = useDebounce(selectedSkill, 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      `user-manager-${debouncedSearchTerm}-${debouncedSelectedYear}-${debouncedSelectedSkill}-${debouncedCurrentPage}`,
    ],
    queryFn: () =>
      userService.getAllUser({
        search: debouncedSearchTerm,
        page: debouncedCurrentPage,
        limit: 10,
      }),
  });

  const { mutate: handleDeleteById, isPending } = useMutation({
    mutationFn: userService.deleteUserById,
  });

  const totalPages = Math.ceil(Number(data?.data?.pagination?.totalPages));

  const handleAction = (member: IUser, mode: "view" | "edit") => {
    setSelectedMember(member);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleOpenModalAddMember = () => {
    setSelectedMember(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleOpenModalDelete = (member: any) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteById(
      { id: selectedMember?._id as string },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setDeleteModalOpen(false);
          refetch();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      }
    );
  };

  return (
    <div className="space-y-6 overflow-x-auto">
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
          {/* {isAdmin && (
            <Button onClick={handleOpenModalAddMember}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm thành viên
            </Button>
          )} */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px] focus-visible:outline-none">
                <SelectValue placeholder="Lọc theo năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Years">Tất cả năm</SelectItem>
                <SelectItem value="Freshman">Năm nhất</SelectItem>
                <SelectItem value="Sophomore">Năm hai</SelectItem>
                <SelectItem value="Junior">Năm ba</SelectItem>
                <SelectItem value="Senior">Năm tư</SelectItem>
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
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <MemberTable
        members={data?.data?.users || []}
        isAdmin={isAdmin}
        onView={(member) => handleAction(member, "view")}
        onEdit={(member) => handleAction(member, "edit")}
        onDelete={handleOpenModalDelete}
      />

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        member={selectedMember!}
        isAdmin={isAdmin}
      />
      {selectedMember && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Xóa thành viên"
          description={`Bạn có chắc chắn muốn xóa thành viên ${selectedMember.username} khỏi câu lạc bộ? Hành động này không thể hoàn tác.`}
        />
      )}
    </div>
  );
}
