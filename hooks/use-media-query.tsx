import { useState, useEffect } from "react";

interface MediaQuery {
  matches: boolean;
  query: string;
}

const useMediaQuery = (query: string): MediaQuery => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", updateMatches);

    // Initial check
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return { matches, query };
};

export default useMediaQuery;
