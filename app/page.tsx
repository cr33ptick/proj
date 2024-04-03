import { redirect } from "next/navigation";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { isSubscribed } = await getUserPlan();

  if (!user) {
    redirect("/sign-in");
  }
  const dbUser = await db.user.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!dbUser) {
    redirect("/auth-callback");
  }

  if (!isSubscribed) {
    redirect("/pricing");
  }

  const store = await db.store.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (store) {
    redirect(`/dashboard/${store.id}`);
  }

  redirect("/create");
}
