import { SuccessResponse } from "@/types/response-type";
import { ITeam } from "@/types/team-type";
import axiosClient from "./axios-client";

const teamService = {
  getTeams: async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<ITeam[]>>(`/user/members`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch teams");
    }
  },
  getTeamById: async ({ id }: { id: string }) => {
    try {
      const response = await axiosClient.get<SuccessResponse<ITeam>>(`/user/teams/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch team by id");
    }
  },
  createTeam: async (team: ITeam) => {
    try {
      const response = await axiosClient.post<SuccessResponse<ITeam>>("/user/teams", team);
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
