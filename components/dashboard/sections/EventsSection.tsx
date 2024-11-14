"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventDetailsModal from "@/components/modals/EventDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EventsGrid from "./events/EventsGrid";
import SearchInput from "@/components/common/SearchInput";
import { useTranslation } from "@/hooks/useTranslation";
import { useFilter } from "@/hooks/useFilter";
import { createSearchFilter } from "@/lib/utils/filters";
import EventModal from "@/components/modals/CreateEventModal";
import ApprovalModal from "@/components/modals/ApprovalModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import eventService from "@/services/event-service";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: "Pending Approval" | "Approved" | "Rejected";
  description: string;
  requester?: string;
}

const ITEMS_PER_PAGE = 6;

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Workshop 2024",
    date: "2024-03-15",
    time: "14:00",
    location: "H4.1",
    attendees: 25,
    status: "Pending Approval",
    description: "Hội thảo về các công nghệ web mới nhất và các phương pháp tốt nhất.",
    requester: "Le Dat",
  },
  {
    id: 2,
    title: "Hackathon Spring",
    date: "2024-04-01",
    time: "09:00",
    location: "H8.1",
    attendees: 50,
    status: "Approved",
    description: "Thử thách lập trình 24 giờ cho các thành viên câu lạc bộ.",
  },
  // Add more mock events as needed
];

export default function EventsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();

  const [selectedTeam, setSelectedTeam] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { searchTerm, setSearchTerm, filteredItems } = useFilter({
  //   items: mockEvents,
  //   filterFn: (event, { searchTerm }) =>
  //     createSearchFilter(searchTerm, ["title", "location"])(event),
  // });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`team-manager-${currentPage}`],
    queryFn: () => eventService.getEvents({ page: 1, limit: 10 }),
    enabled: true,
  });

  const { mutate: handleDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: eventService.deleteEvent,
  });

  const { mutate: handleUpdateById, isPending: isUpdateDelete } = useMutation({
    mutationFn: eventService.updateEvent,
  });

  const loadMore = async () => {
    if (isLoading) return;
    // setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setDisplayedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, mockEvents.length));
    // setIsLoading(false);
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleRegister = (eventId: number) => {
    setRegisteredEvents((prev) => [...prev, eventId]);
  };

  const handleApproval = (event: Event) => {
    setSelectedEvent(event);
    setIsApprovalModalOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting event:", selectedEvent?.id);
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const displayedEvents = mockEvents.slice(0, displayedItems);
  const hasMore = displayedItems < mockEvents.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("events.searchPlaceholder")}
          className="w-72"
        />
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {isAdmin ? t("events.createEvent") : t("events.requestEvent")}
        </Button>
      </div>

      <EventsGrid
        events={displayedEvents}
        isAdmin={isAdmin}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onView={handleView}
        onEdit={(event) => {
          if (event.status === "Pending Approval") {
            handleApproval(event);
          } else {
            setSelectedEvent(event);
            setIsEditModalOpen(true);
          }
        }}
        onDelete={(event) => handleDelete(event)}
        onRegister={handleRegister}
        registeredEvents={registeredEvents}
      />

      {selectedEvent && (
        <>
          <EventDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            event={selectedEvent}
            isAdmin={isAdmin}
            onEdit={handleEdit}
          />

          <EventModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            isAdmin={isAdmin}
            event={selectedEvent}
            mode="edit"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={t("events.deleteTitle")}
            description={`${t("events.deleteConfirmation")} ${selectedEvent?.title || ""}`}
          />

          <ApprovalModal
            isOpen={isApprovalModalOpen}
            onClose={() => setIsApprovalModalOpen(false)}
            type="event"
            item={selectedEvent}
          />
        </>
      )}

      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isAdmin={isAdmin}
        mode="create"
      />
    </div>
  );
}
