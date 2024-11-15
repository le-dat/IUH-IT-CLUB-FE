import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface ICompetition extends IId {
  competitionName: string;
  competitionDate: Date;
  description: string;
  location: string;
  status: "open" | "closed up" | null;
}

export interface ITeam extends ICommonMongodb {
  teamName: string;
  teamLeader?: IUser;
  members: IUser[] | [];
  description: string;
  competition: ICompetition[];
  status: "open" | "closed";
}
