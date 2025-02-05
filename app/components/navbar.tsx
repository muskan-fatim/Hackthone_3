'use client';
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { useSearch } from "../context/SearchContext";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { FaThumbsUp, FaUser } from 'react-icons/fa'; // User icon for not logged in
import { FiMenu } from 'react-icons/fi'; // Menu icon
import { Home, Bell, Car, Heart } from "lucide-react";

interface NavbarProps {
  onSearch: () => void; // Define the onSearch prop type
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { isSignedIn } = useUser(); // Check if user is logged in

  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const { setSearchQuery } = useSearch();
  const router = useRouter();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar visibility
 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(); // Trigger the scroll function in the parent component
  };

  const handleNotificationClick = () => {
    router.push('/notification');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);
  return (
    <>
      {/* Sidebar for mobile */}
      <div
        className={`fixed   inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleSidebar} // Close sidebar when clicked outside
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center py-6 mt-40">
          {/* Sidebar content */}
          <button
        className="flex items-center gap-2 text-lg font-semibold py-2 px-4 text-blue-500"
        onClick={() => router.push("/")}
      >
        <Home className="w-5 h-5" />
        Home
      </button>
      <button
        className="flex items-center gap-2 text-lg font-semibold py-2 px-4 text-blue-500"
        onClick={() => router.push("/favorite")}
      >
        <Heart className="w-5 h-5" />
        Favorite
      </button>
      
      <button
        className="flex items-center gap-2 text-lg font-semibold py-2 px-4 text-blue-500"
        onClick={() => router.push("/notification")}
      >
        <Bell className="w-5 h-5" />
        Notifications
      </button>

      <button
        className="flex items-center gap-2 text-lg font-semibold py-2 px-4 text-blue-500"
        onClick={() => router.push("/car-love")}
      >
        <Car className="w-5 h-5" />
        Demanding Car
      </button>

      
    
         
        </div>
      </div>

     {/* Navbar */}
<nav className="fixed top-0 left-0 w-full z-50 flex flex-wrap  items-center justify-between px-4 sm:px-8 py-4 bg-white shadow">
  <div className="md:hidden space-x-56">
    <FiMenu className="text-3xl text-blue-500 cursor-pointer" onClick={toggleSidebar} />
  </div>

  <div className="text-2xl font-bold text-blue-500">MORENT</div>

  {/* User Button for all screen sizes */}
  <div className="sm:hidden">
    {isSignedIn ? (
      <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition",
            },
          }}
        />
      </Suspense>
    ) : (
      <FaUser
        className="text-4xl border p-2 border-gray-300 rounded-full text-gray-600 cursor-pointer"
        onClick={openModal}
      />
    )}
  </div>

        <div className="relative flex items-center w-full mt-4 sm:mt-0 sm:max-w-md">
          <input
            type="text"
            placeholder="Search something here"
            className="w-full px-4 py-2 pl-10 text-sm text-gray-700 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />
          <div className="absolute left-3">
            <Image
              src="/search-icon.png"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
          <div className="absolute right-3">
            <Image
              src="/filter.png"
              alt="Filter"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="flex flex-wrap items-center justify-end w-full mt-4 space-x-4 sm:mt-0 sm:w-auto sm:space-x-6">
          <button onClick={() => router.push("/car-love")} className=" relative p-2 border border-gray-300 rounded-full hover:bg-gray-100">
                        <FaThumbsUp className="text-2xl sm:text-2xl text-gray-500"/>
                        </button>

            {/* Heart Icon */}
            <button onClick={() => router.push("/favorite")} className=" relative p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <Image
                src="/heart.png"
                alt="Heart"
                width={24}
                height={24}
              />
               {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={handleNotificationClick}
              className="relative p-2 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Image
                src="/notification-icon.png"
                alt="Notification"
                width={24}
                height={24}
              />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {isSignedIn ? (
      <Suspense fallback={<div className="text-sm text-gray-500">Loading...</div>}>
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition",
            },
          }}
        />
      </Suspense>
    ) : (
      <FaUser
        className="text-4xl border border-gray-300 rounded-full p-2 text-gray-600 cursor-pointer"
        onClick={openModal}
      />
    )}
            </div>
            </div>
            </nav>

            {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-11/12 sm:w-4/12">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-2xl text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Please Log In or Sign Up
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => router.push("/login")}
          className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300 transform hover:scale-105"
        >
          Log In
        </button>
        <button
          onClick={() => router.push("/login")}
          className="w-full py-3 px-4 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all ease-in-out duration-300 transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default Navbar;