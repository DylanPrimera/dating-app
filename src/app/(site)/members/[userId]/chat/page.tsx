import { CardInnerWrapper } from "@/components";
import { ChatForm } from "./components/ChatForm";
import { getAuthUserId, getMessagesThread } from "@/actions";
import { MessageList } from "./components/MessageList";
import { createChatId } from "@/lib";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { userId } = await params;
  const messages = await getMessagesThread(userId);
  const authUserId = await getAuthUserId();
  const chatId = createChatId(authUserId, userId);
  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={authUserId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
}
