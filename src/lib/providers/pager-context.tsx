import React, { useContext } from "react";

interface PagerContextValue {
  currentPage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  setCurrentPage: (pageNum: number) => void;
}

const PagerContext = React.createContext<PagerContextValue | undefined>(
  undefined
);

export function PagerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PagerContextValue;
}) {
  return (
    <PagerContext.Provider value={value}>{children}</PagerContext.Provider>
  );
}

export function usePagerContext() {
  const context = useContext(PagerContext);
  if (!context) {
    throw new Error("usePagerContext must be used within a PagerProvider");
  }
  return context;
}
