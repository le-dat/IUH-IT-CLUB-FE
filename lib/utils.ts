import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(dateString: string): string {
  return moment(dateString).format("DD/MM/YYYY");
}

export function getCourseNumber(index: number): string {
  const currentYear = new Date().getFullYear();
  const lastTwoDigits = currentYear.toString().slice(-2);
  return `k${parseInt(lastTwoDigits) - 4 - index}`;
}

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
