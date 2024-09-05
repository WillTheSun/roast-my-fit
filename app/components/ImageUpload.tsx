"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageUpload: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (file.size > maxSize) {
      window.alert('File size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setPreviewUrl(base64String);
      onImageUpload(base64String);
    };

    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });

  return (
    <div 
      {...getRootProps()} 
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 h-40 sm:h-64 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img src={previewUrl} alt="Uploaded image" className="max-w-full max-h-full object-contain" />
      ) : (
        <div>
          <p className="text-base sm:text-lg mb-2">
            {isDragActive ? "Drop the image here" : "Tap to select an image"}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
            Or drag and drop here
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;