import { ICommonMongodb } from "./common";

export interface IUser extends ICommonMongodb {
  email: string;
  password: string;
  username: string;
  phone: string;
  codeStudent: string;
  role: "admin" | "member" | "visitor" | "teamLeader";

  skills?: string[];
}
