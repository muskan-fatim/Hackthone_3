'use client';

import { useEffect, useState } from "react";
import { SearchProvider } from "../context/SearchContext";
import Navbar from "../components/navbar";

type Notification = {
  message: string;
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (

    <div className="container mx-auto mt-10 px-6 md:px-12 lg:px-20">
      <SearchProvider>
      <Navbar onSearch={()=>{}} />
    </SearchProvider>
      <h1 className="text-3xl font-bold text-gray-900 text-center  pt-12">
        Notifications
      </h1>

      {notifications.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                {/* Notification Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                  🔔
                </div>

                {/* Notification Content */}
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{notification.message}</p>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>

                {/* Dismiss Button */}
                <button className="text-gray-400 hover:text-gray-700 transition">
                  ✖
                </button>
              </li>
            ))}
          </ul>

          {/* Clear All Button */}
          <div className="flex justify-end mt-4">
            <button
              className="px-5 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={clearNotifications}
            >
              Clear All
            </button>
          </div>
        </div>
      ): (
        <div className="mt-10 flex flex-col items-center text-center">
          <img
            src="/notification.PNG"
            alt="No notifications"
            className="w-60 h-48 mb-6"
          />
          <p className="text-lg text-gray-600">
            You’re all caught up! No notifications at the moment.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check back later for updates or stay tuned for new alerts.
          </p>
        </div>
      )}
     
    </div>
  );
}
export default NotificationsPage;
