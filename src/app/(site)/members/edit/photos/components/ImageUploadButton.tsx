'use client';
import {CldUploadButton, CloudinaryUploadWidgetResults} from 'next-cloudinary'
import { HiPhoto } from 'react-icons/hi2';

interface Props {
    onUploadImage: (
        result: CloudinaryUploadWidgetResults
      ) => void;
}

export const ImageUploadButton: React.FC<Props> = ({onUploadImage}) => {
  return (
    <CldUploadButton
    options={{maxFiles: 1}}
    onSuccess={onUploadImage}
    uploadPreset='neinter'
    className={`flex items-center gap-2 border-2 border-gray-400 text-gray-400 rounded-lg py-1 px-3 hover:bg-default/10`}
    >
    <HiPhoto size={25}/>
        Upload new image
    </CldUploadButton>
  )
}
