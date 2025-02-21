"use client";

import { deleteImage, setMainImage } from "@/actions";
import type { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "./DeleteButton";
import { MemberImage } from "./MemberImage";
import { StarButton } from "./StarButton";

interface Props {
	photos: Photo[] | null;
	editing?: boolean;
	mainImageUrl?: string | null;
}

// TODO: change the name of this component

export const OwnPhotos: React.FC<Props> = ({
	photos,
	editing,
	mainImageUrl,
}) => {
	const router = useRouter();
	const [loading, setIsLoading] = useState({
		type: "",
		isLoading: false,
		id: "",
	});

	const onSetMain = async (photo: Photo) => {
		if (photo.url === mainImageUrl) {
			return null;
		}
		setIsLoading({
			isLoading: true,
			id: photo.id,
			type: "main",
		});
		try {
			await setMainImage(photo);
			router.refresh();
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading({
				isLoading: false,
				id: "",
				type: "",
			});
		}
	};
	const onDeletePhoto = async (photo: Photo) => {
		if (photo.url === mainImageUrl) {
			return null;
		}
		setIsLoading({
			isLoading: true,
			id: photo.id,
			type: "delete",
		});
		await deleteImage(photo);
		router.refresh();
		setIsLoading({
			isLoading: false,
			id: "",
			type: "",
		});
	};
	return (
		<div className="grid grid-cols-5 gap-3 p-5">
			{photos?.map((photo) => (
				<div key={photo.id} className="relative">
					<MemberImage photo={photo} />
					{editing && (
						<div className="flex items-center justify-between w-full absolute top-1">
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div onClick={() => onSetMain(photo)} className="z-50">
								<StarButton
									selected={photo.url === mainImageUrl}
									loading={
										loading.isLoading &&
										loading.type === "main" &&
										loading.id === photo.id
									}
								/>
							</div>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div onClick={() => onDeletePhoto(photo)} className="z-50">
								<DeleteButton
									loading={
										loading.isLoading &&
										loading.type === "delete" &&
										loading.id === photo.id
									}
								/>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
