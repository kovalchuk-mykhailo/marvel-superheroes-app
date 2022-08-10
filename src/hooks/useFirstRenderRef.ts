import { useEffect, useRef } from 'react';

const useFirstRenderRef = (callback: () => void) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      callback();
    }
  }, []);

  return {
    firstRenderRef
  };
};

export default useFirstRenderRef;
