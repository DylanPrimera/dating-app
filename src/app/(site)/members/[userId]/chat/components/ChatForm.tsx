"use client";

import { createMessage } from "@/actions";
import { Button, Input } from "@/components";
import { cn, handleFormServerErrors } from "@/lib";
import { messageSchema, MessageSchema } from "@/lib/schemas/MessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export const ChatForm = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
      return;
    }
    reset();
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-2">
        <Input
          id="text"
          type='text'
          placeholder="Type a message..."
          {...register("text")}
          className={cn(
            "resize-none",
            errors.text && "focus:ring-rose-500 focus:ring-2"
          )}
        />
        <Button type="submit" size="icon" disabled={!isValid || isSubmitting}>
          {!isSubmitting && <HiPaperAirplane size={18} />}

          {isSubmitting && <Loader2 className="animate-spin" />}
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-red-500 text-sm">
            {errors.root?.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
};
