"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOutUser } from "@/actions";
import { getInitials } from "@/lib";

interface Props {
  user: {
    name?: string | null;
    image?: string | null;
  } | null;
}

export const UserMenu: React.FC<Props> = ({ user }) => {
  const routes = [
    {
      label: "Members",
      href: "/members",
    },
    {
      label: "Matches",
      href: "/lists",
    },
    {
      label: "Messages",
      href: "/messages",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image ?? "https://github.com/shadcn.png"}
            alt="User avatar"
          />
          <AvatarFallback className="text-black">
            {getInitials(user?.name ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-row" aria-label="username">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/members/edit"} className="w-full">
            Edit profile
          </Link>
        </DropdownMenuItem>
        <div className="block md:hidden">
          {routes.map((route, index) => (
            <DropdownMenuItem key={index}>
              <Link href={route.href}>{route.label}</Link>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuItem className="hover:bg-red-500/20 hover:cursor-pointer rounded-md group">
          <button
            type="button"
            onClick={() => signOutUser()}
            className="group-hover:text-red-700 group-hover:font-semibold"
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
