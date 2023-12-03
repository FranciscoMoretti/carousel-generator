import { FocusEvent, useState } from "react";

export function useSelection() {
  const [currentSelection, setCurrentSelection] = useState<string>("");

  function _setCurrentSelection(
    currentSelection: string,
    event:
      | FocusEvent<HTMLTextAreaElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | null
  ) {
    // Only clear selection if this element started the event
    // if (event.target == event.currentTarget) {
    setCurrentSelection(currentSelection);
    if (event) event.stopPropagation();
    // }
  }

  return {
    currentSelection,
    setCurrentSelection: _setCurrentSelection,
  };
}
