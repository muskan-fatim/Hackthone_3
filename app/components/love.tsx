'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReviewSection from "./review";
import { Cards } from "./hero";
import Navbar from "./navbar";
import { FaThumbsUp } from 'react-icons/fa';
import { SearchProvider } from "../context/SearchContext";

const CarDetails = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleClick = (carId: string) => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/components/${carId}`);
    } else {
      router.push(`/components/${carId}`);
    }
  };

  const handleScroll = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SearchProvider>
        <Navbar onSearch={handleScroll} />
        
        <div className="flex flex-col items-center pt-24 px-4 sm:px-8 lg:px-16 ">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center space-x-3 mt-8 text-center">
            <FaThumbsUp className="text-5xl sm:text-6xl text-yellow-500" />
            <span>User's Most Demanding Car</span>
          </h1>
        </div>

        {/* Main Layout: Two Separate Containers */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-4 sm:px-8 lg:px-16 mt-10 ">
          {/* Left Section: Image and Text */}
          <div className="lg:w-1/2 flex flex-col bg-blue-600 text-white p-6 rounded-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold  mb-4 transition-transform hover:scale-105">
              Sports car with the best design and acceleration
            </h1>
            <p className="text-lg  mb-6">
              Experience ultimate safety and comfort while driving a futuristic and elegant sports car. Precision in every detail.
            </p>
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg  transition-transform transform hover:scale-105">
              <Image
                src="https://s3-alpha-sig.figma.com/img/702f/356e/48fe531e6fd2626c5d1041dbfcde3341?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JzbWG66I-rm67MLnDrN6y5jb9aQAAxDz2zCOIm-EsSRMLwmggUbQcqsNdbDUJmHwUu3NhC6FQoYR4gVD2g7mCs6EeBGTtj5HRFQY3h~0Q~Yic4iFi-bwnbkSmwei3Vu7iNtSwyzhxCgXJgSHjxJdEMhbiwCdYIdnSjkSj5~KpyTna321FFXdVO2NrglCw40ZbjyMFS6O-WlLCSveQZFlcdUPK0T-QxUMMSWSCOb1wXHuJyyYYdUdc0GV~fiBHqGCeKvZkKFE7OBr~17ApXtUQt2WtTMeFMQqogSylxuEWx-JDL0tWykG4-e91qJBFxLIqL4037J34iEQQ1T3n0BTJg__"
                alt="Sports Car"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Section: Car Details */}
          <div className="lg:w-1/2 bg-white shadow-xl p-6 sm:p-8 rounded-lg">
            <h2 className="text-2xl sm:text-3xl text-blue-900 mb-2 font-bold">Nissan GT - R</h2>
            <p className="text-lg text-gray-600 mb-4">
              NISMO has become the embodiment of Nissan's outstanding performance, inspired by the unforgiving "race track."
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li><strong>Type:</strong> Sport</li>
              <li><strong>Steering:</strong> Manual</li>
              <li><strong>Capacity:</strong> 2 Persons</li>
              <li><strong>Fuel:</strong> Gasoline</li>
              <li><strong>Tank Capacity:</strong> 70L</li>
            </ul>

            <div>
              <p className="text-2xl font-bold text-blue-800 mb-4">
                $80.00 <span className="text-sm line-through text-gray-500">$100.00</span>/day
              </p>
              <button
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                onClick={() => handleClick("aWt125CyehY2YfnCtxxgSW")}
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
        <ReviewSection />

        {/* Cards Section */}
        <div ref={cardsRef} className="mt-16 px-4 sm:px-8 lg:px-16">
          <Cards />
        </div>
      </SearchProvider>
    </div>
  );
};

export default CarDetails;
