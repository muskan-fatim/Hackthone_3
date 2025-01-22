'use client';
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import Hero from './components/hero';
import Navbar from './components/navbar';
import { NotificationProvider } from './context/NotificationContext';

const App = () => {
  return (
    <NotificationProvider> {/* Ensure NotificationProvider wraps the components that need it */}
      <SearchProvider>
        <Navbar />
        <Hero />
      </SearchProvider>
    </NotificationProvider>
  );
};

export default App;
