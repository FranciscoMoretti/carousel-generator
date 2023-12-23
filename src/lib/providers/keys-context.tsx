import React, { useContext } from "react";

interface KeysContextValue {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}

const KeysContext = React.createContext<KeysContextValue | undefined>(
  undefined
);

export function KeysProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: KeysContextValue;
}) {
  return <KeysContext.Provider value={value}>{children}</KeysContext.Provider>;
}

export function useKeysContext() {
  const context = useContext(KeysContext);
  if (!context) {
    throw new Error("useKeysContext must be used within a KeysProvider");
  }
  return context;
}
