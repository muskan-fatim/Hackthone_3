'use client';
import { useState } from "react";
import Image from "next/image";
import { useSearch } from "../context/SearchContext";
import { useNotification } from "../context/NotificationContext";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { setSearchQuery } = useSearch();
  const { notifications, clearNotifications } = useNotification();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar visibility

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNotificationClick = () => {
    router.push('/notification');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleSidebar} // Close sidebar when clicked outside
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center py-6">
          <Image
            src="/sidebar.png"
            alt="Sidebar Logo"
            width={40}
            height={40}
            className="object-cover mb-4"
          />
          <button
            className="text-lg font-semibold py-2 px-4 text-blue-500"
            onClick={() => router.push('/notification')}
          >
            Notifications
          </button>
          <button
            className="text-lg font-semibold py-2 px-4 text-blue-500"
            onClick={() => router.push('/car-love')}
          >
            Car Rentals
          </button>
          {/* Add more items here as needed */}
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-4 bg-white shadow">
        <div className="md:hidden flex space-x-56">
          <div className="w-10 h-10 overflow-hidden cursor-pointer" onClick={toggleSidebar}>
            <Image
              src="/sidebar.png"
              alt="Sidebar Icon"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="w-10 h-10 overflow-hidden border border-gray-300 rounded-full">
             <UserButton
                                  appearance={{
                                      elements: {
                                          userButtonTrigger:
                                              "px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition",
                                      },
                                  }}
                              />
          </div>
        </div>

        <br />

        {/* Search Bar */}
        <div className="text-2xl font-bold text-blue-500">MORENT</div>
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
            {/* Heart Icon */}
            <button onClick={() => router.push("/car-love")} className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <Image
                src="/heart.png"
                alt="Heart"
                width={24}
                height={24}
              />
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
           
            {/* Profile Image */}
            <UserButton
                                  appearance={{
                                      elements: {
                                          userButtonTrigger:
                                              "px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition",
                                      },
                                  }}
                              />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
