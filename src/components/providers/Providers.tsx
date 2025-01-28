'use client';

import { getUnreadMessageCount } from "@/actions";
import { useMessageStore, useNotificationChannel, usePresenceChannel } from "@/hooks";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
import { Toaster } from "sonner";
interface Props {
  children: React.ReactNode;
  userId: string | null;
}

export const Providers: React.FC<Props> = ({ children, userId }) => {
  const isUnreadCountSet = useRef(false);
  const {updateUnreadCount} = useMessageStore();

  const setUnreadCount = useCallback((amount: number)=>{
    updateUnreadCount(amount);
  },[updateUnreadCount]);


  useEffect(()=> {
    if(!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountSet.current = true;
    }
  },[setUnreadCount, userId]);

  usePresenceChannel();
  useNotificationChannel(userId);
  return (
    <>
      <Toaster position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
