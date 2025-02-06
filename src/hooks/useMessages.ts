import { MessageDto } from "@/types";
import { useMessageStore } from "./useMessageStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteMessages, getMessagesByContainer } from "@/actions";

const outboxColumns = [
  {
    key: "recipientName",
    label: "Recipient",
  },
  {
    key: "text",
    label: "Message",
  },
  {
    key: "created",
    label: "Time sent",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const inboxColumns = [
  {
    key: "senderName",
    label: "Sender",
  },
  {
    key: "text",
    label: "Message",
  },
  {
    key: "created",
    label: "Time received",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const useMessages = (
  initialMessages: MessageDto[],
  nextCursor?: string
) => {
  const { set, remove, messages, updateUnreadCount, resetMessages } = useMessageStore();

  const cursorRef = useRef(nextCursor);

  const searchParams = useSearchParams();
  const router = useRouter();
  const container = searchParams.get("container");
  const isOutbox = searchParams.get("container") === "outbox";
  const [isDeleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    set(initialMessages);
    return () => {
      resetMessages();
    };
  }, [initialMessages, set]);

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);
      const { messages, nextCursor } = await getMessagesByContainer(
        container!,
        cursorRef.current
      );
      set(messages);
      cursorRef.current = nextCursor;
      setLoadingMore(false);
    }
  }, [container, set]);

  const handleRowSelected = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({
        id: message.id,
        loading: true,
      });
      await deleteMessages(message.id, isOutbox);
      remove(message.id);
      if (!message.dateRead && !isOutbox) {
        updateUnreadCount(-1);
      }
      setDeleting({ id: "", loading: false });
    },

    [isOutbox, remove, updateUnreadCount]
  );

  return {
    isOutbox,
    columns,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelected,
    isDeleting,
    messages,
    loadingMore,
    loadMore,
    hasMore: !!cursorRef.current,
  };
};
