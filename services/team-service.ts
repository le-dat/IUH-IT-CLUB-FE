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
      const response = await axiosClient.post<SuccessResponse<ITeam>>("/team/create", team);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create team");
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
      const response = await axiosClient.post<SuccessResponse<null>>(`/team/join/${id}`, user);
      return response.data;
    } catch (error) {
      throw new Error("Failed to request join team");
    }
  },
  acceptMemberJoinTeam: async ({ id, user }: { id: string; user: IUser }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<null>>(
        `/team/${id}/requests/${user?._id}`,
        { action: "accept" }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to accept join team");
    }
  },
  rejectMemberJoinTeam: async ({ id, user }: { id: string; user: IUser }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<null>>(
        `/team/${id}/requests/${user?._id}`,
        { action: "reject" }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to reject join team");
    }
  },
  requestLeaveTeam: async ({ id, userId }: { id: string; userId: string }) => {
    try {
      const response = await axiosClient.post<SuccessResponse<null>>(`/team/leave/${id}`, userId);
      return response.data;
    } catch (error) {
      throw new Error("Failed to request leave team");
    }
  },
  deleteMemberInTeamById: async ({ id, userId }: { id: string; userId: string }) => {
    try {
      const response = await axiosClient.delete<SuccessResponse<null>>(`/team/${id}/members`, { data: { userId } });
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete team");
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
