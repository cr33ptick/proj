"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getUser } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Page() {
  const [token, _] = useLocalStorage<string>("token", "");
  const user = getUser(token);
  if (!user) {
    redirect("/login");
  }

  redirect(`/${user.userId}/${user.role.toLowerCase()}`);
}
