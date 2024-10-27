import { useRef } from 'react';
import TeamCard from './TeamCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Users } from 'lucide-react';

interface TeamsGridProps {
  teams: any[];
  isAdmin: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onView: (team: any) => void;
  onEdit: (team: any) => void;
  onDelete: (team: any) => void;
  onJoin: (teamId: number) => void;
  joinRequests: number[];
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
  joinRequests,
}: TeamsGridProps) {
  const { observerRef } = useInfiniteScroll({
    onLoadMore,
    isLoading,
    hasMore,
  });

  if (teams.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-12 w-12" />}
        message="Không có nhóm nào"
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team, index) => (
        <TeamCard
          key={team.id}
          team={team}
          isAdmin={isAdmin}
          onView={() => onView(team)}
          onEdit={() => onEdit(team)}
          onDelete={() => onDelete(team)}
          onJoin={() => onJoin(team.id)}
          hasJoinRequest={joinRequests.includes(team.id)}
          index={index}
        />
      ))}
      {(isLoading || hasMore) && (
        <div ref={observerRef} className="col-span-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}