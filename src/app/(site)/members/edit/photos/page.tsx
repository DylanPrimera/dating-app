import { getAuthUserId, getMemberById, getMemberPhotos } from "@/actions";
import { CardInnerWrapper } from "@/components";
import { MemberPhotoUpload } from "./components/MemberPhotoUpload";
import { OwnPhotos } from "./components/OwnPhotos";

export default async function MemberPhotosPage() {
	const userId = await getAuthUserId();
	const member = await getMemberById(userId);
	const memberPhotos = await getMemberPhotos(userId);
	return (
		<CardInnerWrapper
			header="Upload Photos"
			className="h-full w-full"
			body={
				<>
					<MemberPhotoUpload />
					<OwnPhotos
						photos={memberPhotos}
						editing={true}
						mainImageUrl={member?.image}
					/>
				</>
			}
		/>
	);
}
