import React, { FocusEvent, useContext } from "react";

interface SelectionContextValue {
  currentSelection: string;
  setCurrentSelection: (
    selection: string,
    event:
      | FocusEvent<HTMLTextAreaElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | null
  ) => void;
}

const SelectionContext = React.createContext<SelectionContextValue | undefined>(
  undefined
);

export function SelectionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SelectionContextValue;
}) {
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("usePagerContext must be used within a PagerProvider");
  }
  return context;
}
