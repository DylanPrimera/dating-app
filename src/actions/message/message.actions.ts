"use server";

import { MessageSchema } from "@/lib/schemas/MessageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserId } from "../auth/auth.actions";
import { messageSchema } from "../../lib/schemas/MessageSchema";
import prisma from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib";

export const createMessage = async (
  recipienUserId: string,
  data: MessageSchema
): Promise<ActionResult<Message>> => {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipienUserId,
        senderId: userId,
      },
    });

    return { status: "success", data: message };
  } catch (error) {
    console.log("emssage error", error);
    return { status: "error", error: "Something went wrong" };
  }
};

export const getMessagesThread = async (recipientId: string) => {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId, senderDeleted: false },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getMessagesByContainer = async (container: string) => {
  try {
    const userId = await getAuthUserId();

    const outboxConditions = { senderId: userId, senderDeleted: false };
    const inboxConditions = { recipientId: userId, recipientDeleted: false };
    const conditions =
      container === "outbox" ? outboxConditions : inboxConditions;

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const deleteMessages = async (messageId: string, isOutbox: boolean) => {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";
  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
