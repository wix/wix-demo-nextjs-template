"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { ManagedUIContext } from "./context";
import { getWixClient } from "@/app/model/auth/auth";

const queryClient = new QueryClient();

const wixClient = getWixClient();

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <WixClientContext.Provider value={wixClient}>
    <ManagedUIContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagedUIContext>
  </WixClientContext.Provider>
);
