'use client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeartIcon, UserGroupIcon, BeakerIcon, CogIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import { useSearch } from '../context/SearchContext';
import Fuse from 'fuse.js';
import {  NotificationProvider, useNotification } from '../context/NotificationContext';
import router, { useRouter } from 'next/navigation';

// Define CarType interface
interface CarType {
  _id: string;
  transmission: string;
  name: string;
  image: string;
  type: string;
  pricePerDay: number;
  fuelCapacity: number;
  seatingCapacity: number;
  tags: string[];
}

// Fetch data from Sanity
const fetchPopularCars = async () => {
  return client.fetch(`*[_type=="car" && "popular" in tags]{
    transmission,
    name,
    "image": image.asset->url,
    type,
    pricePerDay,
    fuelCapacity,
    seatingCapacity,
    tags,
    _id
  }`);
};

const fetchRecommendedCars = async () => {
  return client.fetch(`*[_type=="car" && "recommended" in tags]{
    transmission,
    name,
    "image": image.asset->url,
    type,
    pricePerDay,
    fuelCapacity,
    seatingCapacity,
    tags,
    _id
  }`);
};

export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row items-stretch justify-between p-10 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="bg-blue-400 p-6 flex-1 rounded-lg">
          <h2 className="text-3xl text-white">
            The Best Platform<br />for Car Rental
          </h2>
          <p className="text-white mt-2">
            Ease of doing a car rental safely and reliably.<br />
            Of course, at a low price.
          </p>
          <button className="bg-blue-600 p-2 text-white mt-5">Rent a Car</button>
          <Image
            src="https://car-rental-website-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcar.11698147.jpg&w=640&q=75"
            alt="Car Image"
            className="mt-4 w-auto rounded-lg bg-transparent"
            width={500}
            height={500}
          />
        </div>

        <div className="bg-blue-600 p-6 flex-1 rounded-lg">
          <h2 className="text-3xl text-white">
            Easy Way to Rent a<br />Car at a Low Price
          </h2>
          <p className="text-white mt-2">
            Providing cheap car rental services<br />
            with safe and comfortable facilities.
          </p>
          <button className="bg-blue-400 p-2 text-white mt-5">Rent a Car</button>
          <Image
            src="https://car-rental-website-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcar(1).cab606a9.jpg&w=640&q=75"
            alt="Car Image"
            className="mt-4 w-full rounded-lg bg-transparent"
            width={500}
            height={500}
          />
        </div>
      </div>
           <Cards />
    

    </div>
  );
}


export function Cards() {
  const router = useRouter(); // This should now work since it's in a client component

  const [login] = useState<React.ReactElement | null>(null)
  const { searchQuery } = useSearch();
  const [popularCars, setPopularCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [likedStates, setLikedStates] = useState<{ [key: string]: boolean }>({});
  const [results, setResults] = useState([]);
  const { addNotification } = useNotification();
// setlogin("/login") - removed as it is not necessary
  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const popCars = await fetchPopularCars();
      const recCars = await fetchRecommendedCars();
      setPopularCars(popCars);
      setRecommendedCars(recCars);

      // Initialize liked states
      const initialLikes: { [key: string]: boolean } = {};
      [...popCars, ...recCars].forEach((car) => {
        initialLikes[car._id] = false;
      });
      setLikedStates(initialLikes);
    }
    fetchData();
  }, []);

  // Update results when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      const fuseOptions = { keys: ['name'], threshold: 0.3 };
      const popularResults = new Fuse(popularCars, fuseOptions).search(searchQuery).map((res) => res.item);
      const recommendedResults = new Fuse(recommendedCars, fuseOptions).search(searchQuery).map((res) => res.item);
  
      // Combine results if needed or handle separately
      setResults([...popularResults, ...recommendedResults]);
    } else {
      // No search query, reset to default cars
      setResults([...popularCars, ...recommendedCars]);
    }
  }, [searchQuery, popularCars, recommendedCars]);
  
  const toggleLike = (carId: string, carName: string) => {
    setLikedStates((prev) => {
      const isLiked = !prev[carId];
      if (isLiked) {
        setTimeout(() => {
          toast.success('Car added to favorites!', { position: 'top-right' });
          addNotification(`You added ${carName} to favorites.`);
        }, 0);
      } else {
        setTimeout(() => {
          toast.info('Car removed from favorites.', { position: 'top-right' });
        }, 0);
      }
    
      return {
        ...prev,
        [carId]: isLiked,
      };
    });
  };

  const renderCars = (cars: CarType[]) =>
    
    cars.map((car) => (
      <div key={car._id} className="bg-white rounded-lg shadow-lg p-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold mt-4">{car.name}</h3>
          <HeartIcon
            onClick={() => toggleLike(car._id,car.name)}
            className={`h-5 w-5 cursor-pointer ${
              likedStates[car._id] ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </div>
        <p className="text-gray-400">{car.type}</p>
        <Image
          src={car.image}
          alt={car.name}
          width={300}
          height={200}
          className="rounded-lg"
        />
        <div className="flex">
          <span className="text-black">${car.pricePerDay}</span>
          <p className="text-gray-400 font-semibold">/day</p>
        </div>
        <div className="mt-2 flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <BeakerIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm">{car.fuelCapacity}L</span>
          </div>
          <div className="flex items-center space-x-1">
            <CogIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm">{car.seatingCapacity}</span>
          </div>
        </div>
        <button  className="items-center w-40 p-2 m-4 ml-2 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition duration-300" onClick={() => handleClick(car._id)} >Rent now</button>
      </div>
    ));

  const handleClick = (carId: string) => {
    if (!login) {
      // If the user is not logged in, redirect to the login page with the redirect URL as a query parameter
      router.push(`/login?redirect=/components/${carId}`);
    } else {
      // If the user is logged in, proceed to the component page directly
      router.push(`/components/${carId}`);
    }
  };

  return (
    <section className="container mx-auto px-4 mt-12">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Popular Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length > 0 ? renderCars(results) : <p>No cars found.</p>}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Recommended Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length > 0 ? renderCars(results) : <p>No cars found.</p>}
      </div>
    </section>
  );
}

