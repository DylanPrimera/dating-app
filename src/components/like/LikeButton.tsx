"use client";

import { toggleLikeMember } from "@/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "sonner";

interface Props {
  targetId: string;
  hasLiked: boolean;
}
export const LikeButton: React.FC<Props> = ({ targetId, hasLiked }) => {
  const router = useRouter();

  const toggleLike = async () => {
    const { status } = await toggleLikeMember(targetId as string, hasLiked);
    toast.success(status);

    router.refresh();
  };

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer hover:scale-110"
      title="Like"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={cn(
          hasLiked && "fill-rose-500",
          !hasLiked && "fill-neutral-500/70"
        )}
      />
    </div>
  );
};
