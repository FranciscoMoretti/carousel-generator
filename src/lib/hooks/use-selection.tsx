import { useState } from "react";

export function useSelection() {
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);

  return {
    currentSelection,
    setCurrentSelection,
  };
}
