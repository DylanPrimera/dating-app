"use client";
import { deleteMessages } from "@/actions";
import { Button } from "@/components";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, truncateString } from "@/lib";
import { MessageDto } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  messages: MessageDto[];
}

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
    key: "sendertName",
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

export const MessagesTable: React.FC<Props> = ({ messages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutbox = searchParams.get("container") === "outbox";
  const [isDeleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const handleRowSelected = (messageId: string) => {
    const message = messages.find(m=> m.id === messageId);

    const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
    router.push(url + '/chat');
  }

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({
        id: message.id,
        loading: true,
      });
      await deleteMessages(message.id, isOutbox);
      router.refresh();
      setDeleting({ id: "", loading: false });
    },

    [isOutbox, router]
  );

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto p-4">
      <Table aria-label="Table with messages" className="shadow-none">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id} className="cursor-pointer" onClick={()=>handleRowSelected(message.id)}>
              <TableCell
                className={cn("flex items-center gap-2", {
                  "font-semibol": !message.dateRead && !isOutbox,
                })}
              >
                <Avatar>
                  <AvatarImage
                    alt="Image of member"
                    src={
                      (isOutbox
                        ? message.recipientImage
                        : message.senderImage) || ""
                    }
                  />
                </Avatar>
                <span>
                  {truncateString(
                    isOutbox ? message.recipientName : message.senderName,
                    80
                  )}
                </span>
              </TableCell>
              <TableCell
                className={cn({
                  "font-semibol": !message.dateRead && !isOutbox,
                })}
              >
                {message.text}
              </TableCell>
              <TableCell
                className={cn({
                  "font-semibol": !message.dateRead && !isOutbox,
                })}
              >
                {message.created}
              </TableCell>
              <TableCell>
                <Button
                  title="Dele message"
                  variant="outline"
                  className="bg-transparent border-none shadow-none"
                  size="icon"
                  onClick={() => handleDeleteMessage(message)}
                  disabled={isDeleting.loading}
                >
                  {isDeleting.id === message.id && isDeleting.loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <AiFillDelete size={24} className="text-red-500" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
