import { IDevice } from "@/types/device-type";
import { SuccessResponse } from "@/types/response-type";
import axiosClient from "./axios-client";
import { IPagination } from "@/types/common";

const deviceService = {
  getDevices: async ({
    search = "",
    status = "",
    page,
    limit,
  }: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosClient.get("/equipment", {
        params: { q: search, status, page, limit },
      });
      return response.data as SuccessResponse<{ equipment: IDevice[]; pagination: IPagination }>;
    } catch (error) {
      throw new Error("Failed to fetch devices");
    }
  },

  getDeviceById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IDevice>>(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch device by id");
    }
  },
  createDevice: async ({ data }: { data: IDevice }) => {
    try {
      const response = await axiosClient.post("/equipment", data);
      return response.data as SuccessResponse<IDevice>;
    } catch (error) {
      throw new Error("Failed to create device");
    }
  },
  requestDeviceById: async ({ id, data }: { id: string; data: IDevice }) => {
    try {
      const response = await axiosClient.post(`/equipment/${id}`, data);
      return response.data as SuccessResponse<IDevice>;
    } catch (error) {
      throw new Error("Failed to request device");
    }
  },
  updateDeviceById: async ({ id, data }: { id: string; data: IDevice }) => {
    try {
      const response = await axiosClient.put(`/equipment/${id}`, data);
      return response.data as SuccessResponse<IDevice>;
    } catch (error) {
      throw new Error("Failed to update device");
    }
  },

  deleteDeviceById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/equipment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete device");
    }
  },
};

export default deviceService;
