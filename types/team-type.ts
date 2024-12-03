import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface ITeam extends ICommonMongodb {
  teamName: string;
  teamLeader?: IUser;
  members: IUser[] | [];
  joinRequests: IUser[] | [];
  description: string;
  status: "open" | "closed";
}
