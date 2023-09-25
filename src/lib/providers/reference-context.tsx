import React, { createContext, useContext, useRef, ReactNode } from "react";

// Create a context for the ref
const RefContext = createContext<React.RefObject<HTMLInputElement> | null>(
  null
);

// Custom hook to access the ref value
export function useRefContext() {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error("useRefContext must be used within a RefProvider");
  }
  return context;
}

// The RefProvider component
interface RefProviderProps {
  children: ReactNode;
  myRef: React.RefObject<HTMLInputElement>;
}

export function RefProvider({ children, myRef }: RefProviderProps) {
  return <RefContext.Provider value={myRef}>{children}</RefContext.Provider>;
}
