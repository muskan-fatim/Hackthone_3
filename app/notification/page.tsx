'use client';

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { useNotification } from "../context/NotificationContext";

export default function NotificationsPage() {
  const { notifications } = useNotification();

  return (
    <div className="container mx-auto mt-10 px-6 md:px-12 lg:px-20">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Notifications
      </h1>
      {notifications.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notifications.map((notification: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined, index: Key | null | undefined) => (
            <li
              key={index}
              className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-200 ease-in-out"
            >
              {notification}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 flex flex-col items-center text-center">
          <img
            src="/notification.PNG" // Replace with a better placeholder or your own image
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
