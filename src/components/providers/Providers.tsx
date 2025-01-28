'use client';

import { useNotificationChannel, usePresenceChannel } from "@/hooks";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
interface Props {
  children: React.ReactNode;
  userId: string | null;
}

export const Providers: React.FC<Props> = ({ children, userId }) => {

  usePresenceChannel();
  useNotificationChannel(userId);
  return (
    <>
      <Toaster position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
