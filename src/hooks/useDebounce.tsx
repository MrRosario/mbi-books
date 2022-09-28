import React, { useEffect, useState } from "react";

const useDebounce = (searchTerm: String, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(searchTerm);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [searchTerm, delay]
    );
    return debouncedValue;
  }

export default useDebounce;