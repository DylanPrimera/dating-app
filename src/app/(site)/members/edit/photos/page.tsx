import { getAuthUserId, getMemberPhotos } from "@/actions";
import Image from "next/image";

export default async function MemberPhotosPage() {
  const userId = await getAuthUserId();
  const memberPhotos = await getMemberPhotos(userId);
  return (
    <div className="grid grid-cols-1 items-center md:grid-cols-4 lg:grid-cols-5 p-5">
      {memberPhotos && memberPhotos?.length > 0 &&
        memberPhotos?.map((photo) => (
          <Image
            key={photo.id}
            width={120}
            height={120}
            src={photo.url}
            alt="User photo"
            className=" object-cover rounded-full"
          />
        ))}
      {memberPhotos?.length === 0 && (
        <p className="text-center text-gray-500">No photos found</p>
      )}
    </div>
  );
}
