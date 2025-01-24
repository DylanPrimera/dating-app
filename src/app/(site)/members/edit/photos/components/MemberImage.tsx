/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components";
import { approvePhoto, rejectPhoto } from "@/actions";

interface Props {
  photo: Photo | null;
}

export const MemberImage: React.FC<Props> = ({ photo }) => {
  const role = useRole();
  const isAdmin = role === "ADMIN";
  const router = useRouter();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && !isAdmin,
          })}
          priority
        />
      ) : (
        <Image
          src={photo?.url}
          alt="Image of user"
          width={300}
          height={300}
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && !isAdmin,
          })}
        />
      )}
      {!photo?.isApproved && !isAdmin && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            onClick={() => approve(photo.id)}
            color="success"
            className="w-full"
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onClick={() => reject(photo)}
            color="danger"
            className="w-full"
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};
