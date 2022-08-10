import React, { useRef, useEffect } from "react";

export interface UseOutside {
  children: JSX.Element
  setIsDropdown: () => void
  isActive: boolean
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: React.RefObject<HTMLElement>, setIsDropdown: () => void, isActive: boolean) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: { target: any; }) {
      if (ref.current && !ref.current.contains(event.target) && isActive) {
        // alert("You clicked outside of me!");
        setIsDropdown()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isActive]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter({ children, setIsDropdown, isActive }: UseOutside) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsDropdown, isActive);

  return <div ref={wrapperRef}>{ children }</div>;
}
