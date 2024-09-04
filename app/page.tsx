"use client";

import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import SpinningRoastLoader from './components/SpinningRoastLoader';
import { FaFire } from 'react-icons/fa'; // Import fire icon

const defaultRoast = `Ah, I see you're going for the "I swear I'm not a dad but I'll dress like one" look. That oversized, beige shirt looks like it was borrowed from your grandpa's "beach day" collection—and let's not even get started on those shorts. Looking like a walking advertisement for a laundromat with all those colors washed out to oblivion. And sporting sunglasses as a chest accessory? Bold move, fashion icon.`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development false') {
      setRoast(defaultRoast);
    }
  }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-neutral-100 text-gray-800 font-roboto">
      <h1 className="text-4xl sm:text-4xl md:text-5xl bold pt-4 pb-4 mb-4 sm:mb-8 font-montserrat text-orange-500 flex items-center text-center">
        Roast My Fit <FaFire className="ml-2" />
      </h1>
      <div className="w-full max-w-xl bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <ImageUpload onImageUpload={handleImageUpload} />
        <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">Images deleted immediately 🔒</p>
        {image && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-full hover:bg-red-700 w-full disabled:bg-red-400 font-bold transition-all duration-200 transform hover:scale-105 text-base sm:text-lg"
          >
            {isLoading ? '🔥 Roasting...' : '🔥 Get Roasted 🔥'}
          </button>
        )}
      </div>
      {isLoading && (
        <div className="mt-6 sm:mt-8 text-center">
          <SpinningRoastLoader />
          <p className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 text-yellow-500">Preparing a sizzling roast... 🍖</p>
        </div>
      )}
      {roast && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md w-full max-w-2xl border border-orange-300">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-orange-500 flex items-center">
            <FaFire className="mr-2" /> The Roast:
          </h2>
          <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap">{roast}</p>
        </div>
      )}
    </main>
  );
}
