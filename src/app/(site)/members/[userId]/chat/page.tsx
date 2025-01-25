import { CardInnerWrapper } from "@/components";
import { ChatForm } from "./components/ChatForm";
import { getAuthUserId, getMessagesThread } from "@/actions";
import { MessageBox } from "./components/MessageBox";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { userId } = await params;
  const messages = await getMessagesThread(userId);
  const authUserId = await getAuthUserId();

  const body = (
    <div>
      {messages.length === 0 && "No messages to display"}
      {messages.length > 0 && (
        <div>
          {messages.map((message, index) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={authUserId}
              lastMessage={index === messages.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
}
