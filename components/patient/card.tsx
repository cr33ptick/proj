"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { Role } from "@prisma/client";
interface Card {
  data: {
    User: {
      id: string;
      email: string;
      username: string;
      phoneNo: string;
      password: string;
      role: Role;
      verified: boolean;
      regNo: string;
      specilize: string;
    } | null;
  } & {
    id: string;
    doctorId: string;
    userId: string | null;
    issue: string;
  };
}

export const PatientCard: React.FC<Card> = ({ data }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-4 space-y-4 ">
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-4 justify-start items-center">
          <Button className="rounded-full h-12 w-12 aspect-square bg-slate-400">
            <Icons.user className="h-6 w-6 text-zinc-900" />
          </Button>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-bold text-md text-black">
                {data.User?.username}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-4">
            <p className="font-bold text-lg text-black">Issue: </p>
            <p className="font-bold text-md text-black">{data.issue}</p>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Link
            href={`https://wa.me/${data.User?.phoneNo}`}
            className={buttonVariants({
              className: "text-md w-full",
            })}
          >
            Chat
          </Link>
          <Link
            href={`tel:${data.User?.phoneNo}`}
            className={buttonVariants({
              className: "text-md w-full text-primary",
              variant: "outline",
            })}
          >
            Call
          </Link>
        </div>
      </div>
    </div>
  );
};
