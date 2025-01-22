"use client";
import { calculateAge } from "@/lib/utils";
import { Member } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  member: Member;
}

export const MemberCard: React.FC<Props> = ({ member }) => {
  return (
    <div className="rounded-lg overflow-hidden fade-in shadow-lg p-5">
      <Link href={`/members/${member.userId}`}>
        <Image
          alt={member.name}
          width={200}
          height={200}
          src={member.image || "https://github.com/shadcn.png"}
          className="w-full object-cover rounded transform transition-all duration-300 ease-in-out hover:scale-105"
        />
      </Link>
      <div className="flex items-center justify-between mt-3 mb-2">
        <p className="antialiased font-medium leading-relaxed text-blue-gray-900">
          {member.name}
        </p>
        <p className="antialiased font-medium leading-relaxed text-blue-gray-900">
          {calculateAge(member.dateOfBirth)}
        </p>
      </div>
      <div className="p-6 pt-0">footer</div>
    </div>
  );
};
