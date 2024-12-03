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
import useUserStore from "@/store/user-store";
import useAuthStore from "@/store/auth-store";
import { IUser } from "@/types/user-type";

export default function TeamsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`team-manager-${debouncedSearchTerm}-${debouncedCurrentPage}`],
    queryFn: () =>
      teamService.getTeams({ search: debouncedSearchTerm, page: debouncedCurrentPage, limit: 10 }),
    refetchOnWindowFocus: false,
  });

  const { mutate: handleDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: teamService.deleteTeamById,
  });

  const { mutate: handleUpdateById, isPending: isUpdateDelete } = useMutation({
    mutationFn: teamService.updateTeamById,
  });

  const { mutate: handleRequestJoinTeam, isPending: isUpdateJoinTeam } = useMutation({
    mutationFn: teamService.requestJoinTeam,
  });

  const { mutate: handleRequestLeaveTeam, isPending: isUpdateLeaveTeam } = useMutation({
    mutationFn: teamService.requestLeaveTeam,
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

  const handleJoinTeam = (teamId: string) => {
    handleRequestJoinTeam(
      { id: teamId, user: user! },
      {
        onSuccess: (response) => {
          refetch();
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      }
    );
  };

  const handleLeaveTeam = (teamId: string) => {
    handleRequestLeaveTeam(
      { id: selectedTeam?._id?.toString() as string, userId: user?._id as string },
      {
        onSuccess: (response) => {
          refetch();
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
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
          refetch();
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
          toast.success(response?.message);
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
        onLeave={handleLeaveTeam}
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
            isAdmin={isAdmin}
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

      {isCreateModalOpen && (
        <TeamModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          mode="create"
          team={selectedTeam!}
          refetch={refetch}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}
