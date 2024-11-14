import { create } from "zustand";

interface Event {
  id: string;
  name: string;
  date: string;
}

interface EventState {
  events: Event[];
  setEvent: (events: Event[]) => void;
}

const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvent: (events: Event[]) => set({ events }),
}));

export default useEventStore;
