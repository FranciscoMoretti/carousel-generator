import React, { useContext, useState } from "react";

type StatusType = "loading" | "ready";

interface StatusContextValue {
  status: StatusType;
  setStatus: (status: StatusType) => void;
}

const StatusContext = React.createContext<StatusContextValue | undefined>(
  undefined
);

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StatusType>("loading");

  const value: StatusContextValue = {
    status,
    setStatus,
  };

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
}

export function useStatusContext() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatusContext must be used within a StatusProvider");
  }
  return context;
}
