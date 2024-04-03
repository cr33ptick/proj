import { ArrowRight, CirclePlus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center pl-4 justify-between border-b border-zinc-200">
        <Link href="/" className="flex text-primary text-xl z-40 font-semibold">
          <span>Shareride Kenya</span>
        </Link>

        <div className="hidden items-center gap-4 pr-4 lg:flex">
          <Link href="/publish/1" className="flex gap-4 text-md font-bold">
            <CirclePlus />
            Publish
          </Link>
          <div className=" items-center gap-4 pr-4 sm:flex">
            {!user ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Register <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink>
              </>
            ) : (
              <>
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
