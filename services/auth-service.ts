import { SuccessResponse } from "@/types/response-type";
import axiosClient from "./axios-client";
import { ITokens, IUser } from "@/types/user-type";

type SuccessResponseLogin = {
  tokens: ITokens;
  user: IUser;
};
const authService = {
  register: async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      const response = await axiosClient.post("/auth/register", { email, name, password });
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to register");
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      return response.data as SuccessResponse<SuccessResponseLogin>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to login");
    }
  },

  logout: async ({ refreshToken }: { refreshToken: string }) => {
    try {
      const response = await axiosClient.post("/auth/logout", { refreshToken });
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to logout");
    }
  },

  refreshToken: async ({ refreshToken }: { refreshToken: string }) => {
    try {
      const response = await axiosClient.post("/auth/refresh-token", { refreshToken });
      return response.data as SuccessResponse<null>;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.message ?? "Failed to refresh token");
    }
  },
};

export default authService;
