import { ICommonMongodb } from "./common";

export interface IUser extends ICommonMongodb {
  email: string;
  password: string;
  username: string;
  phone: string;
  courseNumber: string;
  role: "admin" | "member" | "visitor" | "teamLeader";

  skills?: string[];
}
