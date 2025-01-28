"use client";

import { useMessageStore } from "@/hooks";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
}

export const NavItem: React.FC<Props> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const  {unreadCount} = useMessageStore();

  return (
    <Link
      href={href}
      className={clsx(
        "text-gray-200 hover:text-yellow-200 transition",
        isActive && "text-yellow-200"
      )}
    >
      {label}
      {
        href === '/messages' && unreadCount > 0 && (
          <span className="ml-1">({unreadCount})</span>
        )
      }
    </Link>
  );
};
