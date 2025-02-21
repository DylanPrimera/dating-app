"use client";
import { Button, PresenceAvatar } from "@/components";

import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useMessages } from "@/hooks";
import { cn, truncateString } from "@/lib";
import type { MessageDto } from "@/types";
import { Loader2 } from "lucide-react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
	initialMessages: MessageDto[];
	nextCursor?: string;
}

export const MessagesTable: React.FC<Props> = ({
	initialMessages,
	nextCursor,
}) => {
	const {
		isOutbox,
		columns,
		deleteMessage,
		selectRow,
		isDeleting,
		messages,
		loadingMore,
		loadMore,
		hasMore,
	} = useMessages(initialMessages, nextCursor);

	const handleDeleteMessage = (
		message: MessageDto,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.stopPropagation();
		deleteMessage(message);
	};

	return (
		<div className="flex flex-col h-[80vh]">
			<Card className="flex flex-col gap-3 h-full overflow-auto p-4">
				<Table aria-label="Table with messages" className="shadow-none ">
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.key}>{column.label}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{messages?.map((message) => (
							<TableRow
								key={message.id}
								className={cn("cursor-pointer", {
									"font-semibold": !message.dateRead && !isOutbox,
								})}
								onClick={() => selectRow(message.id)}
							>
								<TableCell className="flex items-center gap-2">
									<PresenceAvatar
										userId={isOutbox ? message.recipientId : message.senderId}
										src={
											isOutbox ? message.recipientImage : message.senderImage
										}
									/>
									<span>
										{truncateString(
											isOutbox ? message.recipientName : message.senderName,
											80,
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
										onClick={(e) => handleDeleteMessage(message, e)}
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
				<div className="sticky bottom-0 pb-3 mr-3 text-right">
					<Button color="default" disabled={!hasMore} onClick={loadMore}>
						{loadingMore && <Loader2 className="animate-spin" />}
						{hasMore ? "Load more" : "No more messages"}
					</Button>
				</div>
			</Card>
		</div>
	);
};
