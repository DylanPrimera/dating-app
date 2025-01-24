import { getAuthUserId, getMemberById, getMemberPhotos } from "@/actions";
import { CardContent, CardHeader } from "@/components/ui/card";
import { MemberPhotoUpload } from "./components/MemberPhotoUpload";
import { OwnPhotos } from "./components/OwnPhotos";

export default async function MemberPhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberById(userId);
  const memberPhotos = await getMemberPhotos(userId);
  return (
    <>
      <CardHeader className="text-xl font-semibold text-red-400">
        Upload Photos
      </CardHeader>
      <hr className="border-1 border-gray-300" />
      <CardContent>
        <MemberPhotoUpload />
        <OwnPhotos
          photos={memberPhotos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardContent>
    </>
  );
}
