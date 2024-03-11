'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ManagedUIContext } from './context';
const queryClient = new QueryClient();


export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <ManagedUIContext>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ManagedUIContext>
);
