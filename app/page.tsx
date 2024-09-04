"use client";

import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import SpinningRoastLoader from './components/SpinningRoastLoader';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (imageBase64: string) => {
    setImage(imageBase64);
    setRoast(null);
  };

  const handleSubmit = async () => {
    if (!image) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/roast-fit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error('Failed to get roast');
      }

      const data = await response.json();
      setRoast(data.roast);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Roast My Fit</h1>
      <div className="w-full max-w-xl">
        <ImageUpload onImageUpload={handleImageUpload} />
        {image && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:bg-blue-300"
          >
            {isLoading ? 'Roasting...' : 'Get Roasted'}
          </button>
        )}
      </div>
      {isLoading && (
        <div className="mt-8 text-center">
          <SpinningRoastLoader />
          <p className="text-xl font-semibold mt-4">Preparing a sizzling roast...</p>
        </div>
      )}
      {roast && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">The Roast:</h2>
          <p className="text-lg leading-relaxed">{roast}</p>
        </div>
      )}
    </main>
  );
}
