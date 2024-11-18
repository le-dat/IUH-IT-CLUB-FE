import { SuccessResponse } from "@/types/response-type";
import { ITeam } from "@/types/team-type";
import axiosClient from "./axios-client";
import { IPagination } from "@/types/common";

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
      const response = await axiosClient.get<SuccessResponse<ITeam>>(`/team/teams/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch team by id");
    }
  },
  createTeam: async (team: ITeam) => {
    try {
      const response = await axiosClient.post<SuccessResponse<ITeam>>("/team/teams", team);
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

  updateTeamById: async ({ id, team }: { id: string; team: ITeam }) => {
    try {
      const response = await axiosClient.put<SuccessResponse<ITeam>>(`/teams/${id}`, team);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update team");
    }
  },
  deleteTeamById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/teams/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete team");
    }
  },
};

export default teamService;
