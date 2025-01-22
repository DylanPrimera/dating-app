import { GiSelfLove } from "react-icons/gi";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItem } from "./NavItem";
import { auth } from "@/auth";
import { UserMenu } from "./UserMenu";

export const NavBar = async () => {
  const session = await auth();
  const routes = [
    {
      label: "Matches",
      href: "/members",
    },
    {
      label: "Lists",
      href: "/lists",
    },
    {
      label: "Messages",
      href: "/messages",
    },
  ];
  return (
    <nav className="w-full py-2 px-6 bg-gradient-to-r from-pink-400 via-red-400 to-pink-600 ">
      <div className="flex justify-between items-center 2xl:w-[1350px] 2xl:mx-auto text-white ">
        <div>
          <Link href={"/"} className="flex items-center gap-1">
            <GiSelfLove size={40} className="text-gray-200" />
            <h1 className="font-bold text-3xl text-gray-200">Neinter</h1>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {routes.map((route, index) => (
            <NavItem key={index} {...route} />
          ))}
        </div>
        {session?.user && <UserMenu user={session.user} />}
        {!session?.user && (
          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <Button variant="outline" className="text-black">
                Login
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button variant="outline" className="text-black">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
