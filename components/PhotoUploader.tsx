import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageInfo } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface PhotoUploaderProps {
  onPhotosUpload: (photos: ImageInfo[]) => void;
  uploadedImages: ImageInfo[];
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotosUpload, uploadedImages }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: ImageInfo[] = [];
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newPhotos.push({ id: `${file.name}-${Date.now()}`, src: reader.result as string });
        if (newPhotos.length === acceptedFiles.length) {
          onPhotosUpload(newPhotos);
        }
      };
      reader.readAsDataURL(file);
    });
    setIsDragging(false);
  }, [onPhotosUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
   });

   const handleDragStart = (e: React.DragEvent<HTMLDivElement>, imageId: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ source: 'bin', imageId }));
   };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-300">1. Upload Photos</h2>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-indigo-500 bg-indigo-900/20' : 'border-gray-600 hover:border-gray-500'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-gray-400">
            <UploadIcon className="w-10 h-10 mb-2" />
            <p className="font-semibold">Drag & drop photos here, or click to select</p>
            <p className="text-sm text-gray-500">Supports JPEG, PNG, GIF</p>
        </div>
      </div>

      {uploadedImages.length > 0 && (
         <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-400">Your Images</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {uploadedImages.map((image) => (
                    <div
                        key={image.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, image.id)}
                        className="aspect-square bg-gray-700 rounded-md overflow-hidden cursor-grab active:cursor-grabbing transform hover:scale-105 transition-transform duration-200"
                    >
                        <img src={image.src} alt="uploaded thumbnail" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;