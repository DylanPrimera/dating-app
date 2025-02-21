"use client";
import { usePresenceStore } from "@/hooks";
import type { Member } from "@prisma/client";
import type React from "react";
import { GoDotFill } from "react-icons/go";

interface Props {
	member: Member;
}

export const OnlineDot: React.FC<Props> = ({ member }) => {
	const { membersId } = usePresenceStore();

	const isOnline = membersId.indexOf(member.userId) !== -1;

	if (!isOnline) return null;

	return (
		<>
			<GoDotFill size={22} className="fill-green-500 animate-pulse" />
		</>
	);
};
