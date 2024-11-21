import { useRef } from "react";
import TeamCard from "./TeamCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Users } from "lucide-react";
import { ITeam } from "@/types/team-type";

interface TeamsGridProps {
  teams: ITeam[];
  isAdmin: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onView: (team: ITeam) => void;
  onEdit: (team: ITeam) => void;
  onDelete: (team: ITeam) => void;
  onJoin: (teamId: string) => void;
  onLeave: (teamId: string) => void;
}

export default function TeamsGrid({
  teams,
  isAdmin,
  isLoading,
  hasMore,
  onLoadMore,
  onView,
  onEdit,
  onDelete,
  onJoin,
  onLeave,
}: TeamsGridProps) {
  const { observerRef } = useInfiniteScroll({
    onLoadMore,
    isLoading,
    hasMore,
  });

  if (teams.length === 0) {
    return <EmptyState icon={<Users className="h-12 w-12" />} message="Không có nhóm nào" />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team, index) => {
        const hasJoinRequest = team?.members?.some((member) => member._id === team._id);

        return (
          <TeamCard
            key={team._id}
            team={team}
            isAdmin={isAdmin}
            onView={() => onView(team)}
            onEdit={() => onEdit(team)}
            onDelete={() => onDelete(team)}
            onJoin={() => onJoin(team._id)}
            onLeave={() => onLeave(team._id)}
            hasJoinRequest={hasJoinRequest}
            index={index}
          />
        );
      })}
      {(isLoading || hasMore) && (
        <div ref={observerRef} className="col-span-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
