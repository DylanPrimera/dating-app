"use client";

import { approvePhoto, rejectPhoto } from "@/actions";
import { Button } from "@/components";
import { useRole } from "@/hooks/useRole";
import type { Photo } from "@prisma/client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "sonner";

interface Props {
	photo: Photo | null;
}

export const MemberImage: React.FC<Props> = ({ photo }) => {
	const role = useRole();
	const isAdmin = role === "ADMIN";
	const router = useRouter();
	const [loading, setLoading] = useState({
		id: "",
		value: false,
	});

	if (!photo) return null;

	const approve = async (photoId: string) => {
		setLoading({
			id: "approve",
			value: true,
		});
		try {
			await approvePhoto(photoId);
			router.refresh();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading({
				id: "",
				value: false,
			});
		}
	};

	const reject = async (photo: Photo) => {
		setLoading({
			id: "reject",
			value: true,
		});
		try {
			await rejectPhoto(photo);
			router.refresh();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading({
				id: "",
				value: false,
			});
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
						disabled={loading.id === "approve" && loading.value}
					>
						{loading.id === "approve" && loading.value ? (
							<Loader2 className="animate-spin" size={20} />
						) : (
							<ImCheckmark size={20} />
						)}
					</Button>
					<Button
						onClick={() => reject(photo)}
						color="danger"
						className="w-full"
						disabled={loading.id === "reject" && loading.value}
					>
						{loading.id === "reject" && loading.value ? (
							<Loader2 className="animate-spin" size={20} />
						) : (
							<ImCross size={20} />
						)}
					</Button>
				</div>
			)}
		</div>
	);
};
