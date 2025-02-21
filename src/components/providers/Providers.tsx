"use client";

import { getUnreadMessageCount } from "@/actions";
import {
	useMessageStore,
	useNotificationChannel,
	usePresenceChannel,
} from "@/hooks";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
import { Toaster } from "sonner";
interface Props {
	children: React.ReactNode;
	userId: string | null;
	isUser: boolean;
}

export const Providers: React.FC<Props> = ({ children, userId, isUser }) => {
	const isUnreadCountSet = useRef(false);
	const { updateUnreadCount } = useMessageStore();

	const setUnreadCount = useCallback(
		(amount: number) => {
			updateUnreadCount(amount);
		},
		[updateUnreadCount],
	);

	useEffect(() => {
		if (!isUnreadCountSet.current && userId && isUser) {
			getUnreadMessageCount().then((count) => {
				setUnreadCount(count!);
			});
			isUnreadCountSet.current = true;
		}
	}, [setUnreadCount, userId, isUser]);

	usePresenceChannel(userId, isUser);
	useNotificationChannel(userId);
	return (
		<SessionProvider>
			<HeroUIProvider>
				<Toaster position="top-right" />
				{children}
			</HeroUIProvider>
		</SessionProvider>
	);
};
