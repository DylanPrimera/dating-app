"use client";

import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StarButton } from "./StarButton";
import { DeleteButton } from "./DeleteButton";
import { MemberImage } from "./MemberImage";
import { deleteImage, setMainImage } from "@/actions";

interface Props {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
}

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
      type: 'main'
    });

    await setMainImage(photo);
    router.refresh();
    setIsLoading({
      isLoading: false,
      id: '',
      type: ''
    });
  };
  const onDeletePhoto = async(photo: Photo) => {
    if (photo.url === mainImageUrl) {
      return null;
    }
    setIsLoading({
      isLoading: true,
      id: photo.id,
      type: 'delete'
    });
    await deleteImage(photo);
    router.refresh();
    setIsLoading({
      isLoading: false,
      id: '',
      type: ''
    });
  };
  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div className="flex items-center justify-between w-full absolute top-1">
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
              </>
            )}
          </div>
        ))}
    </div>
  );
};
