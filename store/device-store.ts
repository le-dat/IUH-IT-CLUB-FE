import { IDevice } from "@/types/device-type";
import { create } from "zustand";

interface DeviceState {
  devices: IDevice[];
  setDevices: (devices: IDevice[]) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  setDevices: (devices: IDevice[]) => set({ devices }),
}));
