import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface IDevice extends ICommonMongodb {
  name: string;
  last_check: Date;
  status_available: "available" | "in use" | "unavailable";
  status_health: "good" | "normal" | "poor";
  type: "instrument" | "laptop" | "tablet" | "other";
  requestBy: IUser | null;
  assigner: IUser | null;
  borrowDate: Date | null;
  returnDate: Date | null;
}
