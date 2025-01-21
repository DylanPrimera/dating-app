"use client";

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

  return (
    <Link
      href={href}
      className={clsx(
        "text-gray-200 hover:text-yellow-200 transition",
        isActive && "text-yellow-200"
      )}
    >
      {label}
    </Link>
  );
};
