"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import Link from "next/link";
interface Card {
  data: {
    User: {
      id: string;
      email: string;
      name: string | null;
      imageUrl: string | null;
      phoneNo: string | null;
    } | null;
  } & {
    id: string;
    from: string;
    to: string;
    date: string;
    time: string;
    price: string;
    status: boolean;
    userId: string | null;
    vehicleId: string | null;
  };
}

export const PatientCard: React.FC<Card> = ({ data }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-4 space-y-4 ">
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-4 justify-start items-center">
          <Button className="rounded-full h-12 w-12 aspect-square bg-slate-400">
            <Avatar className="relative w-12 h-12">
              {data.User?.imageUrl ? (
                <div className="relative aspect-square h-full w-full">
                  <Image
                    fill
                    src={data.User?.imageUrl}
                    alt="profile picture"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <AvatarFallback>
                  <span className="sr-only">{data.User?.name}</span>
                  <Icons.user className="h-6 w-6 text-zinc-900" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-bold text-md text-black">{data.User?.name}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-4">
            <p className="font-bold text-lg text-black">Issue: </p>
            <p className="font-bold text-md text-black">{"My issue is"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href={`https://wa.me/${data.User?.phoneNo}`}
            className={buttonVariants({
              className: "text-md",
            })}
          >
            Chat
          </Link>
          <Link
            href={`https://wa.me/${data.User?.phoneNo}`}
            className={buttonVariants({
              className: "text-md",
            })}
          >
            Call
          </Link>
        </div>
      </div>
    </div>
  );
};
