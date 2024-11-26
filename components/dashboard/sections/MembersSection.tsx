"use client";

import Pagination from "@/components/common/Pagination";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import MemberModal from "@/components/modals/MemberModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import userService from "@/services/user-service";
import useUserStore from "@/store/user-store";
import { IUser } from "@/types/user-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MemberTable from "./members/MemberTable";
import { getCourseNumber } from "@/lib/utils";
import { SPECIALTIES } from "@/constants/user";

interface MembersSectionProps {
  isAdmin: boolean;
}

export default function MembersSection({ isAdmin }: MembersSectionProps) {
  const { t } = useTranslation();
  const { setUsers } = useUserStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const debouncedSearchTerm = useDebounce(searchTerm?.trim(), 700);
  const debouncedSelectedLevel = useDebounce(selectedLevel?.trim(), 500);
  const debouncedSelectedSkill = useDebounce(selectedSkill?.trim(), 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      `user-manager-${debouncedSearchTerm}-${debouncedSelectedLevel}-${debouncedSelectedSkill}-${debouncedCurrentPage}`,
    ],
    queryFn: () =>
      userService.getAllUser({
        search: debouncedSearchTerm,
        level: debouncedSelectedLevel,
        skill: debouncedSelectedSkill,
        page: debouncedCurrentPage,
        limit: 10,
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate: handleDeleteById, isPending } = useMutation({
    mutationFn: userService.deleteUserById,
  });

  const totalPages = Number(data?.data?.pagination?.totalPages) || 1;

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
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      }
    );
  };

  useEffect(() => {
    setUsers(data?.data?.users || []);
  }, [data, setUsers]);

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
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn khóa học " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả các khóa</SelectItem>
                {Array.from({ length: 7 }).map((_, index) => (
                  <SelectItem key={index} value={getCourseNumber(index)}>
                    {getCourseNumber(index)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo sở trường" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tất cả sở trường</SelectItem>
                {Object.entries(SPECIALTIES).map(([value, name]) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
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
        refetch={refetch}
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
