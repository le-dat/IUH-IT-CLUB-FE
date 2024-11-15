import { IEvent } from "@/types/event-type";
import { create } from "zustand";

interface EventState {
  events: IEvent[];
  setEvent: (events: IEvent[]) => void;
}

const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvent: (events: IEvent[]) => set({ events }),
}));

export default useEventStore;
