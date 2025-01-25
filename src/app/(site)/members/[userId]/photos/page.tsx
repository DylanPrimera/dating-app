import { getMemberPhotos } from "@/actions";
import { CardInnerWrapper } from "@/components";
import Image from "next/image";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function PhotosPage({ params }: Props) {
  const { userId } = await params;
  const memberPhotos = await getMemberPhotos(userId);
  return (
    <CardInnerWrapper
      header="Member Photos"
      body={
        <>
          <div className="grid grid-cols-1 items-center md:grid-cols-4 lg:grid-cols-5 p-5">
            {memberPhotos?.map((photo) => (
              <Image
                key={photo.id}
                width={120}
                height={120}
                src={photo.url}
                alt="User photo"
                className=" object-cover rounded-full"
              />
            ))}
          </div>
        </>
      }
    />
  );
}
