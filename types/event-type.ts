import { ICommonMongodb } from "./common";
import { IUser } from "./user-type";

export interface IEvent extends ICommonMongodb {
  eventName: string;
  location: string;
  description: string;
  eventDate: string;
  requestBy: IUser | null;
  startTime: string;
  hostUserId: string;
  participants: IUser[] | [];
  status: "active" | "canceled" | "postponed";
}
