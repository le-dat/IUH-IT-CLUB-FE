import { create } from "zustand";

interface Device {
  id: string;
  name: string;
}

interface DeviceState {
  devices: Device[];
  setDevices: (devices: Device[]) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  setDevices: (devices: Device[]) => set({ devices }),
}));
