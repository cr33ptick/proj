import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwtDecode from "jwt-decode";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TokenData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUser() {
  const [token, _] = useLocalStorage("token", "");
  if (!token) return null;
  const decoded: TokenData = jwtDecode(token);
  return decoded;
}
