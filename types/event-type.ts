import { ICommonMongodb } from "./common";
import { IUser } from "./user-type";

export interface IEvent extends ICommonMongodb {
  name: string;
  description: string;
  date: Date;
  start_time: string;
  location: string;
  host_user_id: string;
  participants: IUser[] | [];
  status: "active" | "canceled" | "postponed";
}
