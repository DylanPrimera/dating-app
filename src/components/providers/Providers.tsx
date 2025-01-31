"use client";

import { getUnreadMessageCount } from "@/actions";
import {
  useMessageStore,
  useNotificationChannel,
  usePresenceChannel,
} from "@/hooks";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { HeroUIProvider } from "@heroui/react";
interface Props {
  children: React.ReactNode;
  userId: string | null;
}

export const Providers: React.FC<Props> = ({ children, userId }) => {
  const isUnreadCountSet = useRef(false);
  const { updateUnreadCount } = useMessageStore();

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel();
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
