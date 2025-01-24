'use client';

import {CloudinaryUploadWidgetResults} from 'next-cloudinary'
import { ImageUploadButton } from './ImageUploadButton';
import { addImage } from '@/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export const MemberPhotoUpload = () => {
  const router = useRouter();

    const onAddImage = async(result: CloudinaryUploadWidgetResults) => {
        if(result.info && typeof result.info === 'object') {
          await addImage(result.info.secure_url, result.info.public_id);
          router.refresh();
        } else {
          toast.error('Error uploading image');
        }
    }
  return (
    <div className='my-3'>
        <ImageUploadButton onUploadImage={onAddImage}/>
    </div>
  )
}
