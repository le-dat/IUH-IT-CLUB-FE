"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TeamModal from "@/components/modals/TeamModal";
import TeamDetailsModal from "@/components/modals/TeamDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import TeamsGrid from "./teams/TeamsGrid";
import SearchInput from "@/components/common/SearchInput";
import { useFilter } from "@/hooks/useFilter";
import { createSearchFilter } from "@/lib/utils/filters";
import { useTranslation } from "@/hooks/useTranslation";
import teamService from "@/services/team-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ITeam } from "@/types/team-type";
import useTeamStore from "@/store/team-store";
import { useDebounce } from "@uidotdev/usehooks";
// interface Team {
//   id: number;
//   name: string;
//   members: number;
//   projects: number;
//   lead: string;
//   status: string;
//   description: string;
// }

// const ITEMS_PER_PAGE = 10;

// const mockTeams: Team[] | [] = [
//   {
//     id: 1,
//     name: "Phát triển Web",
//     members: 8,
//     projects: 3,
//     lead: "John Doe",
//     status: "active",
//     description: "Mô tả về phát triển web",
//   },
//   {
//     id: 2,
//     name: "Phát triển Mobile",
//     members: 5,
//     projects: 2,
//     lead: "Jane Doe",
//     status: "inactive",
//     description: "Mô tả về phát triển mobile",
//   },
//   {
//     id: 3,
//     name: "Phát triển Blockchain",
//     members: 10,
//     projects: 1,
//     lead: "Alice Doe",
//     status: "active",
//     description: "Mô tả về phát triển blockchain",
//   },
// ];

export default function TeamsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();
  const { setTeams } = useTeamStore();

  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinRequestSent, setIsJoinRequestSent] = useState<number[]>([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`team-manager-${debouncedCurrentPage}`],
    queryFn: () =>
      teamService.getTeams({ search: debouncedSearchTerm, page: debouncedCurrentPage, limit: 10 }),
  });

  const { mutate: handleDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: teamService.deleteTeamById,
  });

  const { mutate: handleUpdateById, isPending: isUpdateDelete } = useMutation({
    mutationFn: teamService.updateTeamById,
  });

  const loadMore = async () => {
    if (isLoading) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handleView = (team: ITeam) => {
    setSelectedTeam(team);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDelete = (team: ITeam) => {
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };

  const handleJoinTeam = (teamId: number) => {
    handleUpdateById(
      { id: selectedTeam?._id?.toString() || "", team: selectedTeam as unknown as ITeam },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
          setIsJoinRequestSent((prev) => [...prev, teamId]);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      }
    );
  };

  const confirmDelete = () => {
    handleDeleteById(
      { id: selectedTeam?._id?.toString() || "" },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      }
    );
  };

  const hasMore =
    Number(data?.data?.teams?.length) > 0 &&
    Number(data?.data?.pagination?.totalPages) > currentPage &&
    Number(data?.data?.pagination?.totalPages) > 1;

  useEffect(() => {
    setTeams(data?.data?.teams || []);
  }, [data, setTeams]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("teams.searchPlaceholder")}
          className="w-72"
        />
        {isAdmin && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo nhóm mới
          </Button>
        )}
      </div>

      <TeamsGrid
        teams={data?.data?.teams || []}
        isAdmin={isAdmin}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onView={handleView}
        onEdit={(team) => {
          setSelectedTeam(team);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDelete}
        onJoin={handleJoinTeam}
        joinRequests={isJoinRequestSent}
      />

      {selectedTeam && (
        <>
          <TeamDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            team={selectedTeam}
            isAdmin={isAdmin}
            onEdit={handleEdit}
          />

          <TeamModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            mode="edit"
            team={selectedTeam!}
            refetch={refetch}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Xóa nhóm"
            description={`Bạn có chắc chắn muốn xóa nhóm "${selectedTeam.teamName}"? Hành động này không thể hoàn tác.`}
          />
        </>
      )}

      <TeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
        team={selectedTeam!}
      />
    </div>
  );
}
