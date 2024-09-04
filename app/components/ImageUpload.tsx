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
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer h-80 flex items-center justify-center">
      <input {...getInputProps()} />
      {previewUrl ? (
        <img src={previewUrl} alt="Uploaded image" className="max-w-full max-h-full object-contain" />
      ) : isDragActive ? (
        <p className="text-xl">Drop the image here ...</p>
      ) : (
        <p className="text-xl">Drag 'n' drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageUpload;