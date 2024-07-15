"use client";

import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type LoadingContextValue = {
  openLoading: () => void;
  closeLoading: () => void;
};

const initialValue: LoadingContextValue = {
  openLoading: () => {},
  closeLoading: () => {},
};

const LoadingContext = createContext<LoadingContextValue>(initialValue);

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const openLoading = () => setIsLoading(true);
  const closeLoading = () => setIsLoading(false);

  const value: LoadingContextValue = {
    openLoading,
    closeLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}
