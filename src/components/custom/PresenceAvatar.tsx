"use client";

import { usePresenceStore } from "@/hooks";
import { Badge } from "@heroui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib";

interface Props {
  userId?: string;
  src?: string | null;
}

export const PresenceAvatar: React.FC<Props> = ({ userId, src }) => {
  const { membersId } = usePresenceStore();
  const isOnline = userId && membersId.indexOf(userId) !== -1;

  console.log(isOnline);
  return (
    <Badge
      color="success"
      className={cn("bg-green-500 border-none", {
        hidden: !isOnline,
      })}
      content=""
    >
      <Avatar>
        <AvatarImage alt="Image of member" src={src || ""} />
      </Avatar>
    </Badge>
  );
};
