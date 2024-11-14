import { IDevice } from "@/types/device-type";
import { SuccessResponse } from "@/types/response-type";
import axiosClient from "./axios-client";

const deviceService = {
  getDevices: async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IDevice[]>>("/devices", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch devices");
    }
  },

  getDeviceById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IDevice>>(`/devices/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch device by id");
    }
  },
  createDevice: async ({ device }: { device: IDevice }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<IDevice>>("/devices", device);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create device");
    }
  },
  searchDevices: async ({ keyword }: { keyword: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<IDevice[]>>(
        `/devices/search?keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to search devices");
    }
  },

  updateDeviceById: async ({ id, device }: { id: string; device: IDevice }) => {
    try {
      const response = await axiosClient.put<SuccessResponse<IDevice>>(`/devices/${id}`, device);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update device");
    }
  },
  deleteDeviceById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/devices/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete device");
    }
  },
};

export default deviceService;
