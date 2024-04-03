"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useOrigin } from "@/hooks/use-origin";

interface Res {
  success: boolean;
}

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const baseUrl = useOrigin();

  const getUser = async () => {
    const res = await fetch(`${baseUrl}/api/authcallback`);
    const data: Res = await res.json();
    // console.log(data);
    if (!data.success) return router.push("/sign-in");
    router.push("/");
  };

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
