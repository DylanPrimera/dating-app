import { getMessagesByContainer } from "@/actions";
import { MessagesSidebar } from "./components/MessagesSidebar";
import { MessagesTable } from "./components/MessagesTable";

interface Props {
  searchParams: Promise<{ container: string }>;
}

export default async function MessagesPage({ searchParams }: Props) {
  const { container } = await searchParams;
  const messages = await getMessagesByContainer(container);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] my-12">
      <div className="col-span-12 md:col-span-2">
        <MessagesSidebar messagesCount={messages?.length}/>
      </div>
      <div className="col-span-12 md:col-span-10">
        <MessagesTable messages={messages}/>
      </div>
    </div>
  );
}
