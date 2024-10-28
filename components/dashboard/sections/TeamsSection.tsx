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

interface Team {
  id: number;
  name: string;
  members: number;
  projects: number;
  lead: string;
  status: string;
  description: string;
}

const ITEMS_PER_PAGE = 6;

const mockTeams: Team[] = [
  // {
  //   id: 1,
  //   name: "Phát triển Web",
  //   members: 8,
  //   projects: 3,
  //   lead: "Alex Johnson",
  //   status: "Đang hoạt động",
  //   description: "Nhóm phát triển frontend và backend cho các dự án của câu lạc bộ.",
  // },
  // {
  //   id: 2,
  //   name: "Thiết kế UI/UX",
  //   members: 6,
  //   projects: 2,
  //   lead: "Sarah Chen",
  //   status: "Đang hoạt động",
  //   description: "Nhóm thiết kế tập trung vào tạo trải nghiệm người dùng trực quan.",
  // },
  {
    id: 3,
    name: "Đội tuyển lập trình",
    members: 6,
    projects: 2,
    lead: "Le Dat",
    status: "Đang hoạt động",
    description: "Tham gia các cuộc thi lập trình và giải thuật trên toàn quốc.",
  },
];

export default function TeamsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinRequestSent, setIsJoinRequestSent] = useState<number[]>([]);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const { searchTerm, setSearchTerm, filteredItems } = useFilter({
    items: mockTeams,
    filterFn: (team, { searchTerm }) => createSearchFilter(searchTerm, ["name", "lead"])(team),
  });

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setDisplayedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
    setIsLoading(false);
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
    setIsJoinRequestSent((prev) => [...prev, teamId]);
  };

  const confirmDelete = () => {
    console.log("Đang xóa nhóm:", selectedTeam?.id);
    setIsDeleteModalOpen(false);
    setSelectedTeam(null);
  };

  const displayedTeams = filteredItems.slice(0, displayedItems);
  const hasMore = displayedItems < filteredItems.length;

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
