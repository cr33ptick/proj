import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt_decode from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUser() {
  const [lsValue, setLsValue] = useLocalStorage("user", {});
  const token = lsValue.token;

  const decoded = jwt_decode(token);

  const isAdmin = decoded.role;
}
