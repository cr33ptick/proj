import Link from "next/link";
import { buttonVariants } from "./ui/button";

import UserAccountNav from "./UserAccountNav";
import { getUserServer } from "@/lib/auth";

interface Props {
  userId: string;
}

const Navbar: React.FC<Props> = async ({ userId }) => {
  const user = await getUserServer(userId);
  return (
    <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center pl-4 justify-between border-b border-zinc-200">
        <Link href="/" className="flex text-primary text-xl z-40 font-semibold">
          <span>Freelance Doctors</span>
        </Link>

        <div className="flex items-center gap-4 pr-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <UserAccountNav
                name={user.username}
                email={user.email ?? ""}
                imageUrl={""}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
