// components/ClientProviders.js
'use client'; // Mark it as a client component
import { SearchProvider } from '../context/SearchContext';

import { ReactNode } from 'react';

const ClientProviders = ({ children }: { children: ReactNode }) => {
  return <SearchProvider>{children}</SearchProvider>;
};

export default ClientProviders;
