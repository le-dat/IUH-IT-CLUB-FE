import { useRef } from "react";
import EventCard from "./EventCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { IEvent } from "@/types/event-type";
import useAuthStore from "@/store/auth-store";

interface EventsGridProps {
  events: IEvent[] | [];
  isAdmin: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onView: (event: any) => void;
  onEdit: (event: IEvent) => void;
  onDelete: (event: any) => void;
  onRegister: (eventId: string) => void;
}

export default function EventsGrid({
  events,
  isAdmin,
  isLoading,
  hasMore,
  onLoadMore,
  onView,
  onEdit,
  onDelete,
  onRegister,
}: EventsGridProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { observerRef } = useInfiniteScroll({
    onLoadMore,
    isLoading,
    hasMore,
  });

  if (events.length === 0) {
    return <EmptyState icon={<Calendar className="h-12 w-12" />} message={t("events.noEvents")} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {events.map((event, index) => {
        return (
          <EventCard
            key={`event-card-${event._id}`}
            event={event}
            isAdmin={isAdmin}
            onView={() => onView(event)}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event)}
            onRegister={() => onRegister(event._id)}
            isRegistered={event?.registeredParticipants?.includes(user?._id as string)}
            index={index}
          />
        )
      })}
      {(isLoading || hasMore) && (
        <div ref={observerRef} className="col-span-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
