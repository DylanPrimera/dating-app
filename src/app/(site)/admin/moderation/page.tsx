import { getUnapprovedPhotos } from "@/actions";
import { OwnPhotos } from "../../members/edit/photos/components/OwnPhotos";

export default async function PhotoModerationPage() {
	const photos = await getUnapprovedPhotos();

	return (
		<div className="flex flex-col mt-10 gap-3">
			<h3 className="text-2xl">Photos awaiting moderation</h3>
			<hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
			{photos.length > 0 ? (
				<OwnPhotos photos={photos} />
			) : (
				<p className="text-gray-500">No photos to moderate</p>
			)}
		</div>
	);
}
