"use client";
import { useEffect, useRef } from "react";

function useOutsideClick(
  id: string,
  openId: string,
  close: () => void,
  parentRef?: React.RefObject<HTMLElement>
) {
  // const ref = useRef<HTMLUListElement>(null);
  const ref = useRef(null);

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as Node) &&
        !(parentRef?.current as HTMLElement)?.contains(event.target as Node) // it does not close if the click is not outside the parent element
      ) {
        close(); // Close the menu when clicking outside
      }
    };

    // Only attach the listener when the menu is open
    if (id === openId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id, openId, close, parentRef]);
  return ref;
}

export default useOutsideClick;
