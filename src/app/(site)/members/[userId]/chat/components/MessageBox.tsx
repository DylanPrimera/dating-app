"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatMessageTime, getInitials, timeAgo } from "@/lib";
import { MessageDto } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef } from "react";

interface Props {
  message: MessageDto;
  currentUserId: string;
  lastMessage: boolean;
}

export const MessageBox: React.FC<Props> = ({
  message,
  currentUserId,
  lastMessage,
}) => {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageEndRef]);

  const renderAvatar = () => (
    <Avatar>
      <AvatarImage
        src={message.senderImage ?? "https://github.com/shadcn.png"}
        className="w-full"
        alt="User avatar"
      />
      <AvatarFallback className="text-black">
        {getInitials(message.senderName ?? "")}
      </AvatarFallback>
    </Avatar>
  );

  const messageContentClasses = cn(
    "flex flex-col leading-1.5 p-4  dark:bg-gray-700",
    {
      "rounded-b-xl rounded-tl-xl border-blue-100 bg-blue-100":
        isCurrentUserSender,
      "rounded-e-xl rounded-es-xl bg-green-100 border-green-100":
        !isCurrentUserSender,
    }
  );

  const renderMessageContent = () => (
    <div className="flex flex-col gap-1 w-full max-w-[320px]">
      {renderMessageHeader()}
      <div className={messageContentClasses}>
        <p className="text-sm font-normal text-gray-900 dark:text-white">
          {message.text}
        </p>
      </div>
      {lastMessage &&
      message.dateRead &&
      message.recipientId !== currentUserId ? (
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Read {timeAgo(message.dateRead)}
        </span>
      ) : (
        <div></div>
      )}
    </div>
  );
  const renderMessageHeader = () => (
    <div
      className={cn("flex items-center space-x-2 rtl:space-x-reverse", {
        "justify-end": isCurrentUserSender,
      })}
    >
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        {message.senderName}
      </span>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        {formatMessageTime(message.created!)}
      </span>
    </div>
  );


  return (
    <div
      className={cn("flex items-start gap-2.5 my-4", {
        "justify-end text-right": isCurrentUserSender,
      })}
    >
      {!isCurrentUserSender && renderAvatar()}
      {renderMessageContent()}
      {isCurrentUserSender && renderAvatar()}
      <div ref={messageEndRef}></div>
    </div>
  );
};
