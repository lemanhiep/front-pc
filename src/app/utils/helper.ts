import { useState, useEffect } from "react";
import { DataAddress } from "../screen/setting/address/slice/AddressSlice";
// Usage

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const renderAddress = (item?: DataAddress | null) => {
  if(item){
    let detail = item.addressDetail;
  let ward = item.wardName ? " - " + item.wardName : "";
  let district = item.districtName ? " - " + item.districtName : "";
  let province = item.provinceName ? " - " + item.provinceName : "";
  return (
    detail + ward + district + province 
  );
  }
};