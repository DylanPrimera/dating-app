"use client";

import { Button } from "@/components";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { calculateAge, cn } from "@/lib/utils";
import { Member } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  member: Member;
  navLinks?: {
    name: string;
    href: string;
  }[];
}

export const MemberSideBar: React.FC<Props> = ({ member, navLinks }) => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Card className="flex flex-col w-full my-10 h-full">
      <CardContent className="flex-1">
        <div className="flex flex-col items-center">
          <Image
            height={200}
            width={200}
            src={member?.image || "https://github.com/shadcn.png"}
            alt={member.name}
            className="rounded-full mt-6 aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </p>
          <p className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </p>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <nav className="flex flex-col  text-xl gap-4">
          {navLinks?.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={cn(
                "block rounded hover:text-red-400 transition",
                pathName === link.href && "text-red-400"
              )}
            >
              <p>{link.name}</p>
            </Link>
          ))}
        </nav>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={()=> router.back()}>
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
};
