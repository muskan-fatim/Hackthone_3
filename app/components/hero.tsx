'use client';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeartIcon, UserGroupIcon, BeakerIcon, CogIcon } from '@heroicons/react/outline';
import { useState, useEffect, useRef } from 'react';
import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import { useSearch } from '../context/SearchContext';
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import Navbar from './navbar';
import { SearchProvider } from'../context/SearchContext';

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
  const cardsRef = useRef<HTMLDivElement>(null);
  const handleSearch = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-12">
      <SearchProvider>
            <Navbar onSearch={handleSearch} />
      
      <div className="pt-20
       flex flex-col lg:flex-row items-stretch justify-between p-10 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="bg-blue-400 p-6 flex-1 rounded-lg">
          <h2 className="text-3xl text-white font-bold">
            The Best Platform<br />for Car Rental
          </h2>
          <p className="text-white mt-2">
            Ease of doing a car rental safely and reliably.<br />
            Of course, at a low price.
          </p>
          <button className="bg-blue-600 p-2 mt-5 text-white mb-7">Rent a Car</button>
          <Image
            src="https://s3-alpha-sig.figma.com/img/2385/cc01/da9bb791587b8022c475d39822c50c17?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BSh~r5TMqqnrqTJxFsl4yYJTnY~IEs4RRyB7ucFtzoDvbvuQSF-LEbiUaxtotea-U0KeqhAOSx82Z2Je2uX~-zqKVTACuyzX165wIAmp~odjh8iTsDVP3OCpTT0HBCi73pFwjDVk8-s5Xr11Bfs5hst1rjBnjQirKTMkUHkkzhwR4oZSb82QPbREJPnztR-uF9XuPzk2EcmgJiBbIbtzgrD5mTd31sl3MAhjmcS3Ha7HuLHJTjt5BWM3WhVDYtPBfJTIyzOwC9Pr9kzKWu9ZdLA~uu6zFuyD-HCVSnePGWl5X0EKeIRfaIPN-oL9WM1lvKnTkzQoZA6ujIELaSfBRA__"
            alt="Car Image"
            className="mt-4 w-auto rounded-lg bg-transparent"
            width={500}
            height={500}
          />
        </div>

        <div className="bg-blue-600 p-6 flex-1 rounded-lg">
          <h2 className="text-3xl text-white font-bold">
            Easy Way to Rent a<br />Car at a Low Price
          </h2>
          <p className="text-white mt-2">
            Providing cheap car rental services<br />
            with safe and comfortable facilities.
          </p>
          <button className="bg-blue-400 p-2 text-white mt-5">Rent a Car</button>
          <Image
            src="https://s3-alpha-sig.figma.com/img/702f/356e/48fe531e6fd2626c5d1041dbfcde3341?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JzbWG66I-rm67MLnDrN6y5jb9aQAAxDz2zCOIm-EsSRMLwmggUbQcqsNdbDUJmHwUu3NhC6FQoYR4gVD2g7mCs6EeBGTtj5HRFQY3h~0Q~Yic4iFi-bwnbkSmwei3Vu7iNtSwyzhxCgXJgSHjxJdEMhbiwCdYIdnSjkSj5~KpyTna321FFXdVO2NrglCw40ZbjyMFS6O-WlLCSveQZFlcdUPK0T-QxUMMSWSCOb1wXHuJyyYYdUdc0GV~fiBHqGCeKvZkKFE7OBr~17ApXtUQt2WtTMeFMQqogSylxuEWx-JDL0tWykG4-e91qJBFxLIqL4037J34iEQQ1T3n0BTJg__"
            alt="Car Image"
            className="mt-4 w-full rounded-lg"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div ref={cardsRef} className="mt-16 px-4 sm:px-8 lg:px-16">
                <Cards />
              </div>
              </SearchProvider>
    </div>
  );
}



export function Cards() {
  const router = useRouter();
  const { searchQuery } = useSearch(); // Custom hook to get search query
  const [popularCars, setPopularCars] = useState<CarType[]>([]);
  const [recommendedCars, setRecommendedCars] = useState<CarType[]>([]);
  const [likedStates, setLikedStates] = useState<{ [key: string]: boolean }>({});
  const [results, setResults] = useState<CarType[]>([]);
  const [favoriteCars, setFavoriteCars] = useState<CarType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [login, setLogin] = useState<boolean>(false); // Mock login state, update this based on your actual authentication logic

  useEffect(() => {
  async function fetchData() {
    const popCars = await fetchPopularCars();
    const recCars = await fetchRecommendedCars();
    setPopularCars(popCars);
    setRecommendedCars(recCars);

    // Ensure cars show by default if there's no search query
    setResults([...popCars, ...recCars]);

    // Initialize liked states
    const initialLikes: { [key: string]: boolean } = {};
    [...popCars, ...recCars].forEach((car) => {
      initialLikes[car._id] = false;
    });
    setLikedStates(initialLikes);
  }
  fetchData();
}, []);

useEffect(() => {
  if (searchQuery) {
    const fuseOptions = { keys: ['name'], threshold: 0.3 };
    const popularResults = new Fuse(popularCars, fuseOptions).search(searchQuery).map((res) => res.item);
    const recommendedResults = new Fuse(recommendedCars, fuseOptions).search(searchQuery).map((res) => res.item);
    setResults([...popularResults, ...recommendedResults]);
  } else {
    // Ensure that the results always have some data
    setResults([...popularCars, ...recommendedCars]);
  }
}, [searchQuery, popularCars, recommendedCars]);
  

  const toggleFavorite = (car: CarType) => {
    setLikedStates((prev) => {
      const isLiked = !prev[car._id];

      if (isLiked) {
        toast.success('Car added to favorites!', { position: 'top-left' });

        setFavoriteCars((prev) => {
          const updatedFavorites = [...prev, car];
          localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });

        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.push({ message: `You added ${car.name} to your favorites.` });
        localStorage.setItem('notifications', JSON.stringify(notifications));

      } else {
        toast.info('Car removed from favorites.', { position: 'top-right' });

        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.push({ message: `You removed ${car.name} from your favorites.` });
        localStorage.setItem('notifications', JSON.stringify(notifications));

        setFavoriteCars((prev) => {
          const updatedFavorites = prev.filter((favCar) => favCar._id !== car._id);
          localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });
      }

      return {
        ...prev,
        [car._id]: isLiked,
      };
    });
  };

  const handleClick = (carId: string) => {
    if (!login) {
      router.push(`/login?redirect=/components/${carId}`);
    } else {
      router.push(`/components/${carId}`);
    }
  };

  const renderCars = (cars: CarType[]) => {
    if (!cars.length) {
    return <p className="text-center text-gray-500">No cars available</p>;
    }
    const carsToRender = showAll ? cars : cars.slice(0, 6);
    return carsToRender.map((car) => (
      <div key={car._id} className="bg-white rounded-lg shadow-lg p-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold mt-4">{car.name}</h3>
          <HeartIcon
            onClick={() => toggleFavorite(car)}
            className={`h-6 w-6 cursor-pointer ${likedStates[car._id] ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          />
        </div>
        <p className="text-gray-400 image">{car.type}</p>
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
        <button
          className="items-center w-40 p-2 m-4 ml-2 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition duration-300"
          onClick={() => handleClick(car._id)}
        >
          Rent now
        </button>
      </div>
    ));
  };

  return (
    <section className="container mx-auto px-4 mt-12">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Popular Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderCars(results)}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">Recommended Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderCars(results)}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-5 hover:bg-blue-700"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
}
