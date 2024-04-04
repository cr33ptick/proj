"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { Role } from "@prisma/client";
import { BriefcaseMedical, NotebookPen, Verified } from "lucide-react";

interface Card {
  data: {
    id: string;
    email: string;
    username: string;
    phoneNo: string;
    password: string;
    role: Role;
    verified: boolean;
    available: boolean;
    regNo: string;
    specilize: string;
  };
  userId: string;
}

export const MybookingCard: React.FC<Card> = ({ data, userId }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-4 space-y-4 ">
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-4 justify-start items-center">
          <Button className="rounded-full h-12 w-12 aspect-square bg-slate-400">
            <Icons.user className="h-6 w-6 text-zinc-900" />
          </Button>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-bold text-md text-black">{data.username}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 ">
          <div className="flex gap-4">
            <NotebookPen />
            <p className="font-bold text-md text-primary">{data.specilize}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold text-md ">RegNo: </p>
            <p className="font-bold text-md text-primary">{data.regNo}</p>
          </div>
        </div>
        <div className="flex justify-between gap-4 ">
          <div className="flex gap-4 items-center">
            <Verified />
            <p className="font-bold text-md text-primary">
              {data.verified ? "Verified" : "Not Verified"}{" "}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <BriefcaseMedical />
            <p className="font-bold text-md text-primary">
              {data.available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Link
            href={`https://wa.me/${data.phoneNo}`}
            className={buttonVariants({
              className: "text-md w-full",
            })}
          >
            Chat
          </Link>
          <Link
            href={`tel:${data.phoneNo}`}
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
