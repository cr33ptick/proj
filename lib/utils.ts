import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwtDecode from "jwt-decode";
import { TokenData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUser(token: string) {
  try {
    const decoded: TokenData = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}
