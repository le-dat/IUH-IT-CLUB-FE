import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface ICompetition extends IId {
  name: string;
  date: Date;
  description: string;
  location: string;
  status: "champion" | "runner up" | "encourage" | null;
}

export interface ITeam extends ICommonMongodb, IUser {
  // leader?: IUser;
  members: IUser[] | [];
  description: string;
  competition: ICompetition[];
  status: "active" | "inactive";
}
