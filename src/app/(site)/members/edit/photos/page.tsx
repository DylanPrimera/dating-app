import { getAuthUserId, getMemberById, getMemberPhotos } from "@/actions";
import { MemberPhotoUpload } from "./components/MemberPhotoUpload";
import { OwnPhotos } from "./components/OwnPhotos";
import { CardInnerWrapper } from "@/components";

export default async function MemberPhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberById(userId);
  const memberPhotos = await getMemberPhotos(userId);
  return (
    <CardInnerWrapper
      header="Upload Photos"
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
