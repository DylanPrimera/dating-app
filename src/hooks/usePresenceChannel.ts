import { useCallback, useEffect, useRef } from "react";
import { usePresenceStore } from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib";
import { updateLastActive } from "@/actions";
import { Role } from "@prisma/client";

export const usePresenceChannel = (
  userId?: string | null,
  isUser?: boolean | null
) => {
  const { set, add, remove } = usePresenceStore();
  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      set(memberIds);
    },
    [set]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!userId) return;
    if (userId && !isUser) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-neinter");

      channelRef.current.bind(
        "pusher:subscription_succeeded",
        async (members: Members) => {
          handleSetMembers(Object.keys(members.members));
          await updateLastActive();
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, string>) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, string>) => {
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "pusher:subscription_succeeded",
          handleSetMembers
        );
        channelRef.current.unbind("pusher:member_added", handleAddMember);
        channelRef.current.unbind("pusher:member_removed", handleRemoveMember);
      }
    };
  }, [handleAddMember, handleRemoveMember, handleSetMembers, userId]);
};
