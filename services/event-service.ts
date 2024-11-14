import { IEvent } from "@/types/event-type";
import { SuccessResponse } from "@/types/response-type";
import axiosClient from "./axios-client";

const eventService = {
  getEvents: async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IEvent[]>>("/events", {
        params: { page, limit },
      });
      return response.data;
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
      const response = await axiosClient.post<SuccessResponse<IEvent>>("/events", event);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create event");
    }
  },
  searchEvents: async ({ keyword }: { keyword: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IEvent[]>>(
        `/events/search?keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to search events");
    }
  },
  updateEvent: async ({ id, event }: { id: string; event: IEvent }) => {
    try {
      const response = await axiosClient.put<SuccessResponse<IEvent>>(`/events/${id}`, event);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update event");
    }
  },
  deleteEvent: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  },
};

export default eventService;
