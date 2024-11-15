import { ITeam } from "@/types/team-type";
import { create } from "zustand";

interface TeamState {
  teams: ITeam[];
  setTeams: (teams: ITeam[]) => void;
}

const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  setTeams: (teams: ITeam[]) => set({ teams }),
}));

export default useTeamStore;
