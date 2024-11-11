import { ICommonMongodb } from "./common";

export interface IUser extends ICommonMongodb {
  email: string;
  password: string;
  username: string;
  phone_number: string;
  role: "admin" | "member" | "visitor" | "teamLeader";

  skill?: string[];
}
