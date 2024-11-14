import { SuccessResponse } from "@/types/response-type";
import { IUser } from "@/types/user-type";
import axiosClient from "./axios-client";
import { IDashboard } from "@/types/common";

const userService = {
  getDashboard: async () => {
    try {
      const response = await axiosClient.get("/user/dashboard");
      return response.data as SuccessResponse<IDashboard>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get dashboard");
    }
  },
  getMe: async () => {
    try {
      const response = await axiosClient.get("/user/profile");
      return response.data as SuccessResponse<IUser>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get me");
    }
  },
  getAllUser: async ({
    search = "",
    year = "",
    skill = "",
    page = 1,
    limit = 10,
  }: { search?: string; year?: string; skill?: string; page?: number; limit?: number } = {}) => {
    try {
      const response = await axiosClient.get("/user/members", {
        params: { search, year, skill, page, limit },
      });
      return response.data as SuccessResponse<{ users: IUser[]; total: number }>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get all users");
    }
  },
  getUserById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get(`/users/${id}`);
      return response.data as SuccessResponse<IUser>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to get user by id");
    }
  },

  createUser: async ({ data }: { data: Partial<IUser> }) => {
    try {
      const response = await axiosClient.post("/users", data);
      return response.data as SuccessResponse<IUser>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to create user");
    }
  },

  searchUsers: async ({ keyword }: { keyword: string }) => {
    try {
      const response = await axiosClient.get(`/users/search?keyword=${keyword}`);
      return response.data as SuccessResponse<IUser[]>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to search users");
    }
  },

  //  admin
  updateUserById: async ({ id, data }: { id: string; data: Partial<IUser> }) => {
    try {
      const response = await axiosClient.put(`/users/${id}`, data);
      return response.data as SuccessResponse<IUser>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to update user by id");
    }
  },
  deleteUserById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete(`/users/${id}`);
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to delete user by id");
    }
  },
};

export default userService;
