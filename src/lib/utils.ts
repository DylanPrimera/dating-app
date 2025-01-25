import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInYears, format } from "date-fns";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";
import { MessageWithSenderRecipient } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: Date) {
  return differenceInYears(new Date(), birthDate);
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((error) => {
      const filedName = error.path.join(".") as Path<TFieldValues>;
      setError(filedName, { message: error.message });
    });
  } else {
    setError("root", { message: errorResponse.error });
  }
}

export function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");
}
function formatShorDateTime(date: Date) {
  if (date.getDate() === new Date().getDate()) {
    return format(date, "h:mm:a");
  }
  if (date.getDate() === new Date().getDate() - 1) {
    return "Yesterday " + format(date, "h:mm:a");
  }

  if (date.getDate() < new Date().getDate() - 1) {
    return format(date, "dd/MM/yy, h:mm:a");
  }
}

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatShorDateTime(message.created),
    dateRead: message.dateRead ? formatShorDateTime(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  };
}
