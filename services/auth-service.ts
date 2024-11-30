  import { ILogIn, IRegister, IResponseLogin, ITokens } from "@/types/auth-type";
  import { SuccessResponse } from "@/types/response-type";
  import axiosClient from "./axios-client";
  import { AuthStorage } from "@/lib/local-storage";

  const authService = {
    register: async (data: IRegister) => {
      try {
        const response = await axiosClient.post("/user/register", data);
        return response.data as SuccessResponse<ITokens>;
      } catch (error: any) {
        console.error(error);
        throw new Error(error?.message ?? "Failed to register");
      }
    },

    login: async (data: ILogIn) => {
      try {
        const response = await axiosClient.post("/user/login", data);
        return response.data as SuccessResponse<IResponseLogin>;
      } catch (error: any) {
        console.error(error);
        throw new Error(error?.message ?? "Failed to login");
      }
    },

    logout: async () => {
      try {
        const response = await axiosClient.post("/auth/logout");
        return response.data as SuccessResponse<null>;
      } catch (error: any) {
        console.error(error);
        throw new Error(error?.message ?? "Failed to logout");
      } finally {
        AuthStorage.clearToken();
      }
    },

    refreshToken: async ({ refreshToken }: { refreshToken: string }) => {
      try {
        const response = await axiosClient.post("/auth/refresh-token", { refreshToken });
        return response.data as SuccessResponse<ITokens>;
      } catch (error: any) {
        console.error(error);
        throw new Error(error?.message ?? "Failed to refresh token");
      }
    },

    resetPassword: async ({ email }: { email: string }) => {
      try {
        const response = await axiosClient.post("/auth/reset-password", { email });
        return response.data as SuccessResponse<null>;
      } catch (error: any) {
        console.error(error);
        throw new Error(error?.message ?? "Failed to reset password");
      }
    },
  };

  export default authService;
