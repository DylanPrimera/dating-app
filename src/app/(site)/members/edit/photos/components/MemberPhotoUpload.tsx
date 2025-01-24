'use client';

import {CloudinaryUploadWidgetResults} from 'next-cloudinary'
import { ImageUploadButton } from './ImageUploadButton';


export const MemberPhotoUpload = () => {

    const onAddImage = async(result: CloudinaryUploadWidgetResults) => {
        console.log('result', result);
    }
  return (
    <div>
        <ImageUploadButton onUploadImage={onAddImage}/>
    </div>
  )
}
