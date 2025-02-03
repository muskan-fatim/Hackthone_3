'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import Navbar from './navbar';
import { SearchProvider } from '../context/SearchContext';

interface CarType {
  _id: string;
  transmission: string;
  name: string;
  image: string;
  type: string;
  pricePerDay: number;
  fuelCapacity: number;
  seatingCapacity: number;
}

export default function FavoriteCars() {
  const [favoriteCars, setFavoriteCars] = useState<CarType[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCars');
    if (storedFavorites) {
      setFavoriteCars(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <>
      <SearchProvider>
        <Navbar onSearch={() => {}} />
      </SearchProvider>

      {/* 
        Use a flex column container with min-h-screen. 
        This ensures the header, main content, and optional footer 
        are laid out properly even on mobile.
      */}
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
        {/* Main content area */}
        <main className="flex-grow pt-16 md:pt-20 pb-8 ">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 pt-20 sm:pt-24 tracking-wider">
              My Favorite Cars
            </h1>

            {/* Grid Layout */}
            {favoriteCars.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteCars.map((car) => (
                  <div
                    key={car._id}
                    className="relative bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  >
                    {/* Car Image */}
                    <div className="relative overflow-hidden rounded-3xl mb-6">
                      <Image
                        src={car.image}
                        alt={car.name}
                        width={350}
                        height={220}
                        className="rounded-3xl object-cover w-full transition-transform duration-300 transform hover:scale-110"
                      />
                    </div>

                    {/* Car Info */}
                    <div className="mt-4">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {car.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">{car.type}</p>
                    </div>

                    {/* Price & Heart Icon */}
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xl font-semibold text-gray-900">
                        ${car.pricePerDay}
                      </span>
                      <div className="relative">
                        <HeartIcon className="h-8 w-8 text-red-500 fill-red-500 transition-transform duration-300 transform hover:scale-125 cursor-pointer" />
                      </div>
                    </div>

                    {/* Subtle hover background gradient */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-800 opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-3xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-12 flex flex-col items-center text-center">
                <p className="text-2xl text-gray-200">🚗 No favorite cars yet.</p>
                <p className="text-md text-gray-300 mt-2">
                  Start adding your favorite cars to see them here.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {favoriteCars.length > 0 && (
              <div className="mt-12 flex justify-center px-4">
                <button className="px-8 py-3 text-lg font-semibold mb-4 text-blue-700 bg-white rounded-xl hover:bg-blue-700 hover:text-white transition-all">
                  LOAD MORE
                </button>
              </div>
            )}
          </div>
        </main>

      
      </div>
    </>
  );
}
