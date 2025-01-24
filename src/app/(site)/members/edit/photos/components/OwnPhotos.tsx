"use client";

import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StarButton } from "./StarButton";
import { DeleteButton } from "./DeleteButton";
import { MemberImage } from "./MemberImage";

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

  const onSetMain = (photo: Photo) => {
    console.log('onSetMain');
  };
  const onDeletePhoto = (photo: Photo) => {
    console.log('onDelete');
  };
  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo}/>
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div
                  onClick={() => onDeletePhoto(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};
