'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

const NotificationContext = createContext<any>(null);

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulate adding a notification for demo purposes
  const addNotification = (notification: string) => {
    setNotifications((prev) => [...prev, notification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
