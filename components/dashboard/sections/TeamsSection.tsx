"use client";

import { useState } from "react";
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
interface Team {
  id: number;
  name: string;
  members: number;
  projects: number;
  lead: string;
  status: string;
  description: string;
}

const ITEMS_PER_PAGE = 10;

const mockTeams: Team[] | [] = [
  {
    id: 1,
    name: "Phát triển Web",
    members: 8,
    projects: 3,
    lead: "John Doe",
    status: "active",
    description: "Mô tả về phát triển web",
  },
  {
    id: 2,
    name: "Phát triển Mobile",
    members: 5,
    projects: 2,
    lead: "Jane Doe",
    status: "inactive",
    description: "Mô tả về phát triển mobile",
  },
  {
    id: 3,
    name: "Phát triển Blockchain",
    members: 10,
    projects: 1,
    lead: "Alice Doe",
    status: "active",
    description: "Mô tả về phát triển blockchain",
  },
];

export default function TeamsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinRequestSent, setIsJoinRequestSent] = useState<number[]>([]);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`team-manager-${currentPage}`],
    queryFn: () => teamService.getTeams({ page: 1, limit: 10 }),
    enabled: true,
  });

  const { mutate: handleDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: teamService.deleteTeamById,
  });

  const { mutate: handleUpdateById, isPending: isUpdateDelete } = useMutation({
    mutationFn: teamService.updateTeamById,
  });

  // const { searchTerm, setSearchTerm, filteredItems } = useFilter({
  //   items: mockTeams,
  //   filterFn: (team, { searchTerm }) => createSearchFilter(searchTerm, ["name", "lead"])(team),
  // });

  const loadMore = async () => {
    if (isLoading) return;
    // setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setDisplayedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, mockTeams.length));
    // setIsLoading(false);
  };

  const handleView = (team: Team) => {
    setSelectedTeam(team);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDelete = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteModalOpen(true);
  };

  const handleJoinTeam = (teamId: number) => {
    // handleUpdateById(
    //   { id: selectedTeam?.id?.toString() || "", team: selectedTeam as unknown as ITeam },
    //   {
    //     onSuccess: (response) => {
    //       toast.success(response?.message);
    //       setIsDeleteModalOpen(false);
    //       setSelectedTeam(null);
    //     },
    //     onError: (error) => {
    //       console.error(error);
    //       toast.error(error?.message || "An error occurred during login");
    //     },
    //   }
    // );

    setIsJoinRequestSent((prev) => [...prev, teamId]);
  };

  const confirmDelete = () => {
    console.log("Đang xóa nhóm:", selectedTeam?.id);

    handleDeleteById(
      { id: selectedTeam?.id?.toString() || "" },
      {
        onSuccess: (response) => {
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

  const displayedTeams = mockTeams.slice(0, displayedItems);
  const hasMore = displayedItems < mockTeams.length;

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
        teams={displayedTeams}
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
            team={selectedTeam}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Xóa nhóm"
            description={`Bạn có chắc chắn muốn xóa nhóm "${selectedTeam.name}"? Hành động này không thể hoàn tác.`}
          />
        </>
      )}

      <TeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
      />
    </div>
  );
}
