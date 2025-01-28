"use client";

import { usePresenceStore } from "@/hooks";
import { Badge } from "@heroui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";


interface Props {
  userId?: string;
  src?: string | null;
}

export const PresenceAvatar: React.FC<Props> = ({ userId, src }) => {
  const { membersId } = usePresenceStore();
  const isOnline = userId && membersId.indexOf(userId) !== -1;
  return (
    <Badge color="success" className="bg-green-500 border-none" content="" isInvisible={!isOnline}>
      <Avatar>
        <AvatarImage
          alt="Image of member"
          src={src || ''}
        />
      </Avatar>
    </Badge>
  );
};
