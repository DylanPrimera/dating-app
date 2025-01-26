"use client";

import { MessageDto } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { MessageBox } from "./MessageBox";
import { formatDate,  pusherClient } from "@/lib";


interface Props {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}

export const MessageList: React.FC<Props> = ({
  initialMessages,
  currentUserId,
  chatId,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const handleNewMessages = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatDate(new Date()) }
          : message
      )
    );
    
  }, []);
  useEffect(() => {
    const pusherChannel = pusherClient.subscribe(chatId);

    pusherChannel.bind("message:new", handleNewMessages);
    pusherChannel.bind('message:read', handleReadMessages)

    return () => {
      pusherChannel.unsubscribe();
      pusherChannel.unbind("message:new");
      pusherChannel.unbind('message:read');
    };
  }, [chatId, handleNewMessages, handleReadMessages]);

  return (
    <div className="h-full">
      {messages.length === 0 && "No messages to display"}
      {messages.length > 0 && (
        <>
          {messages.map((message, index) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
              lastMessage={index === messages.length - 1}
            />
          ))}
        </>
      )}
    </div>
  );
};
