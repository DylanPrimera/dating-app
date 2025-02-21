"use client";
import type { MessageDto } from "@/types";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { toast } from "sonner";

interface Props {
	image?: string | null;
	href: string;
	title: string;
	subtitle?: string;
}

const NotificationToast: React.FC<Props> = ({
	image,
	href,
	title,
	subtitle,
}) => {
	return (
		<Link href={href} className="flex items-center">
			<div className="mr-2">
				<Image src={image || ""} height={50} width={50} alt="Sender image" />
			</div>
			<div className="felx flex-grow flex-col justify-center">
				<div className="font-semibold">{title}</div>
				<div className="text-sm">{subtitle || "Click to view"}</div>
			</div>
		</Link>
	);
};

export const newMessageToast = (message: MessageDto) => {
	toast(
		<NotificationToast
			image={message.senderImage}
			href={`/members/${message.senderId}/chat`}
			title={`${message.senderName} has sent you a new message`}
		/>,
	);
};

export const newLikeToast = (
	name: string,
	image: string | null,
	userId: string,
) => {
	toast(
		<NotificationToast
			image={image}
			href={`/members/${userId}`}
			title={`You have been liked by ${name}`}
			subtitle="Click here to view their profile"
		/>,
	);
};
