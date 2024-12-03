"use client";

import SearchInput from "@/components/common/SearchInput";
import ApprovalModal from "@/components/modals/ApprovalModalDevice";
import EventModal from "@/components/modals/CreateEventModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import EventDetailsModal from "@/components/modals/EventDetailsModal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import eventService from "@/services/event-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EventsGrid from "./events/EventsGrid";
import useEventStore from "@/store/event-store";
import { IEvent } from "@/types/event-type";
import ApprovalModalEvent from "@/components/modals/ApprovalModalEvent";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";

export default function EventsSection({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslation();
  const { setEvent } = useEventStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);

  const {
    data,
    isLoading: isLoadingGetEvents,
    error,
    refetch,
  } = useQuery({
    queryKey: [`event-manager-${debouncedSearchTerm}`],
    queryFn: () =>
      eventService.getEvents({
        search: debouncedSearchTerm,
        page: debouncedCurrentPage,
        limit: 10,
      }),
    refetchOnWindowFocus: false,
  });

  const { mutate: handleDeleteById, isPending: isPendingDelete } = useMutation({
    mutationFn: eventService.deleteEventById,
  });

  const { mutate: handleRegisterEventById, isPending: isRegisterDelete } = useMutation({
    mutationFn: eventService.registerEventById,
  });

  const isLoading = isLoadingGetEvents || isPendingDelete || isRegisterDelete;

  const loadMore = async () => {
    if (isLoadingGetEvents) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handleOpenModalView = (event: IEvent) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleOpenModalEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleOpenModalDelete = (event: IEvent) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleRegister = (eventId: string) => {
    handleRegisterEventById(
      { id: eventId || "", data: selectedEvent as unknown as IEvent },
      {
        onSuccess: (response) => {
          refetch();
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
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
      { id: selectedEvent?._id?.toString() || "" },
      {
        onSuccess: (response) => {
          refetch();
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          setSelectedEvent(null);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      }
    );
  };

  const hasMore =
    Number(data?.data?.events?.length) > 0 &&
    Number(data?.data?.pagination?.totalPages) > currentPage &&
    Number(data?.data?.pagination?.totalPages) > 1;

  useEffect(() => {
    setEvent(data?.data?.events || []);
  }, [data, setEvent]);

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
        events={data?.data?.events || []}
        isAdmin={isAdmin}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onView={handleOpenModalView}
        onEdit={(event) => {
          setSelectedEvent(event);
          if (event.statusRequest === "pending") {
            setIsApprovalModalOpen(true);
          } else {
            setIsEditModalOpen(true);
          }
        }}
        onDelete={(event) => handleOpenModalDelete(event)}
        onRegister={handleRegister}
      />

      {selectedEvent && (
        <>
          <EventDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            event={selectedEvent}
            isAdmin={isAdmin}
            onEdit={handleOpenModalEdit}
          />

          <EventModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            isAdmin={isAdmin}
            event={selectedEvent}
            mode="edit"
            refetch={refetch}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={t("events.deleteTitle")}
            description={`${t("events.deleteConfirmation")} ${selectedEvent?.eventName || ""}`}
          />

          <ApprovalModalEvent
            isOpen={isApprovalModalOpen}
            onClose={() => setIsApprovalModalOpen(false)}
            item={selectedEvent}
            refetch={refetch}
          />
        </>
      )}

      <EventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isAdmin={isAdmin}
        event={selectedEvent}
        mode="create"
        refetch={refetch}
      />
    </div>
  );
}
