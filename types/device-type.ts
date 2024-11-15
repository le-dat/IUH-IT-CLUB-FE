import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface IDevice extends ICommonMongodb {
  name: string;
  // last_check: Date;
  status: "available" | "in use" | "unavailable" | "pending approval";
  // status_health: "good" | "normal" | "poor";
  type: string;
  // requestBy: IUser | null;
  currentBorrower?: IUser | null;
  borrowDate?: Date | null;
  returnDate?: Date | null;
}
