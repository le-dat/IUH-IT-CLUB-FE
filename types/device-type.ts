import { ICommonMongodb, IId } from "./common";
import { IUser } from "./user-type";

export interface IDevice extends ICommonMongodb {
  name: string;
  lastCheck: Date;
  status: "available" | "in use" | "unavailable" | "pending";
  statusHealth?: "good" | "normal" | "poor";
  type: 'laptop' | 'desktop' | 'mobile-device' | 'projector' | 'cable' | 'other';
  requestBy: IUser | null;
  currentBorrower?: IUser | null;
  borrowDate: string | null;
  returnDate: string | null;
}
