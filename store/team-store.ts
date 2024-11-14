import { create } from "zustand";

interface Team {
  id: string;
  name: string;
  members: string[];
}

interface TeamState {
  teams: Team[];
  setEvent: (teams: Team[]) => void;
}

const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  setEvent: (teams: Team[]) => set({ teams }),
}));

export default useTeamStore;
