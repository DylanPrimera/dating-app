import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addYears, differenceInYears, format, formatDistance } from "date-fns";
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

export function formatMessageTime(date: string) {
  const dateToCompare = new Date(date);
  if (dateToCompare.getDate() === new Date().getDate()) {
    return format(dateToCompare, "h:mm:a");
  }
  if (dateToCompare.getDate() === new Date().getDate() - 1) {
    return "Yesterday " + format(dateToCompare, "h:mm:a");
  }

  if (dateToCompare.getDate() < new Date().getDate() - 1) {
    return format(dateToCompare, "dd/MM/yy, h:mm:a");
  }
}

export function formatDate(date: Date) {
  return format(date,'dd MMM yy h:mm:a');
}


export function timeAgo(date: string) {
  return formatDistance(new Date(date), new Date()) + ' ago';
}

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatDate(message.created),
    dateRead: message.dateRead ? formatDate(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  };
}

export function truncateString(text?: string | null, num = 50) {
  if(!text) return null;
  if(text.length<=num) {
    return text;
  }

  return text.slice(0, num) + '...';
}

export function createChatId(a: string, b:string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}


export function getAgeRange(ageRange: string): Date[] {
  const [minAge, maxAge] = ageRange.split(',');
  const currentDate = new Date();
  const minDob = addYears(currentDate, -maxAge-1);
  const maxDob = addYears(currentDate, -minAge);

  return [minDob, maxDob]
}