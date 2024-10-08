"use client";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/Icons";
import VerifyBtn from "@/components/Verify-btn";
import { Role } from "@prisma/client";
interface Card {
  data: {
    id: string;
    email: string;
    username: string;
    phoneNo: string;
    password: string;
    role: Role;
    verified: boolean;
    regNo: string;
    specilize: string;
  };
}

export const DocterCard: React.FC<Card> = ({ data }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-4 space-y-4 ">
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4 justify-start items-center">
          <Button className="rounded-full h-12 w-12 aspect-square bg-slate-400">
            <Icons.user className="h-6 w-6 text-zinc-900" />
          </Button>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-bold text-md text-primary">{data.username}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="flex gap-4">
            <p className="font-bold text-md text-primary">Specialize: </p>
            <p className="font-bold text-md ">{data.specilize}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold text-md text-primary">License Number: </p>
            <p className="font-bold text-md ">{data.regNo}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-bold text-md text-primary">Verify: </p>
          <VerifyBtn item={{ id: data.id, verified: data.verified }} />
        </div>
      </div>
    </div>
  );
};
