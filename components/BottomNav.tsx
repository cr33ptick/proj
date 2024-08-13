"use client";

import { Car, CirclePlus, MessageCircle, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomNav() {
  const pathname = usePathname();

  function checkPath(route: string) {
    if (route === pathname) return true;
  }

  const focus =
    " text-primary  font-bold rounded-lg hover:text-primary cursor-pointer flex flex-col justify-between py-2 md:px-2 items-center ";
  const notFocused =
    "rounded-lg  text-sm cursor-pointer flex flex-col justify-between py-2 md:px-2 items-center hover:text-primary ";
  return (
    <div className="z-40 lg:hidden  h-14 fixed bottom-0 inset-x-0 rounded-t-lg flex justify-around items-center bg-white border-t-2 border-primary">
      <div className="flex w-full justify-around">
        <Link href="/" className={checkPath("/") ? focus : notFocused}>
          <Search />
          Search
        </Link>
        <Link
          href="/publish/1"
          className={checkPath("/publish/1") ? focus : notFocused}
        >
          <CirclePlus />
          Publish
        </Link>
        <Link
          href="/rides"
          className={checkPath("/rides") ? focus : notFocused}
        >
          <Car />
          Rides
        </Link>

        <Link
          href="/inbox"
          className={checkPath("/inbox") ? focus : notFocused}
        >
          <MessageCircle />
          Inbox
        </Link>
        <Link
          href="/profile"
          className={checkPath("/profile") ? focus : notFocused}
        >
          <User />
          Profile
        </Link>
      </div>
    </div>
  );
}
export default BottomNav;
