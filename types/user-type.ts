import { ICommonMongodb } from "./common";

export interface IUser extends ICommonMongodb {
  email: string;
  password: string;
  username: string;
  phone: string;
  level: string;
  role: "admin" | "member" | "visitor" | "teamLeader";
  description: string;

  skills?: string[];
  skillDetail?: string[];
}
