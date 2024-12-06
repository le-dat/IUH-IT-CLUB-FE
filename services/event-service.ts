import { IEvent } from "@/types/event-type";
import { SuccessResponse } from "@/types/response-type";
import axiosClient from "./axios-client";
import { IPagination } from "@/types/common";

const eventService = {
  getEvents: async ({
    search = "",
    page,
    limit,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosClient.get("/events", {
        params: { q: search, page, limit },
      });
      return response.data as SuccessResponse<{ events: IEvent[]; pagination: IPagination }>;
    } catch (error) {
      throw new Error("Failed to fetch events");
    }
  },
  getEventById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IEvent>>(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch event by id");
    }
  },
  createEvent: async (event: IEvent) => {
    try {
      const response = await axiosClient.post<SuccessResponse<IEvent>>("/events/create", event);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create event");
    }
  },
  updateEventById: async ({ id, data }: { id: string; data: IEvent }) => {
    try {
      const response = await axiosClient.put<SuccessResponse<IEvent>>(`/events/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update event");
    }
  },
  registerEventById: async ({ id, data }: { id: string; data: IEvent }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<IEvent>>(
        `/events/register/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to register event");
    }
  },
  approveEventById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<IEvent>>(`/events/approve`, {
        eventId: id,
        action: "approve",
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to approve event");
    }
  },
  rejectEventById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<IEvent>>(`/events/approve`, {
        eventId: id,
        action: "reject",
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to reject event");
    }
  },
  deleteEventById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  },
  exportExcelEventById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<null>>(`/events/export-event/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  },
};

export default eventService;
