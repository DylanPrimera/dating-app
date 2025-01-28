import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { useMessageStore } from "./useMessageStore";
import { MessageDto } from "@/types";
import { pusherClient } from "@/lib";
import { newLikeToast, newMessageToast } from "@/components";

export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const container = searchParams.get("container");
  const { add, updateUnreadCount } = useMessageStore();

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      if (pathName === "/messages" && container !== "outbox") {
        add(message);
        updateUnreadCount(1);
      } else if (pathName !== `/members/${message.senderId}/chat`) {
        updateUnreadCount(1);
        newMessageToast(message);
      }
    },
    [container, add, pathName, updateUnreadCount]
  );

  const handleNewLike = useCallback(
    (data: {name: string, image: string | null, userId: string}) => {
      newLikeToast(data.name, data.image, data.userId);
    },
    []
  );

  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind('like:new', handleNewLike);
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind('like:new', handleNewLike);
        channelRef.current = null;
      }
    };
  }, [userId, handleNewMessage, handleNewLike]);
};
