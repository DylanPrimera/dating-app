"use client";

import { addImage } from "@/actions";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUploadButton } from "./ImageUploadButton";

export const MemberPhotoUpload = () => {
	const router = useRouter();

	const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
		if (result.info && typeof result.info === "object") {
			await addImage(result.info.secure_url, result.info.public_id);
			router.refresh();
		} else {
			toast.error("Error uploading image");
		}
	};
	return (
		<div className="my-3">
			<ImageUploadButton onUploadImage={onAddImage} />
		</div>
	);
};
