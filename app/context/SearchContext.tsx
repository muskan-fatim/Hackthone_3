import React, { createContext, useContext, useState } from 'react';

// Define the types for the context
type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Create the provider component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
