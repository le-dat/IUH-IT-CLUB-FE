import { SuccessResponse } from "@/types/response-type";
import { ITeam } from "@/types/team-type";
import axiosClient from "./axios-client";
import { IPagination } from "@/types/common";
import { IUser } from "@/types/user-type";

const teamService = {
  getTeams: async ({
    search = "",
    page,
    limit,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosClient.get(`/team`, {
        params: { q: search, page, limit },
      });
      return response.data as SuccessResponse<{ teams: ITeam[]; pagination: IPagination }>;
    } catch (error) {
      throw new Error("Failed to fetch teams");
    }
  },
  getTeamById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<ITeam>>(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch team by id");
    }
  },
  createTeam: async (team: ITeam) => {
    try {
      const response = await axiosClient.post<SuccessResponse<ITeam>>("/team", team);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create team");
    }
  },
  searchTeams: async ({ keyword }: { keyword: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<ITeam[]>>(
        `/teams/search?keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to search teams");
    }
  },

  updateTeamById: async ({ id, data }: { id: string; data: Partial<ITeam> }) => {
    try {
      const response = await axiosClient.put<SuccessResponse<ITeam>>(`/team/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update team");
    }
  },
  requestJoinTeam: async ({ id, user }: { id: string; user: IUser }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<null>>(`/team/${id}/join`, user);
      return response.data;
    } catch (error) {
      throw new Error("Failed to request join team");
    }
  },
  requestLeaveTeam: async ({ id, userId }: { id: string; userId: string }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<null>>(`/team/${id}/leave`, userId);
      return response.data;
    } catch (error) {
      throw new Error("Failed to request leave team");
    }
  },
  deleteTeamById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete team");
    }
  },
};

export default teamService;
