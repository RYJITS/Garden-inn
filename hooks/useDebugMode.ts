
import { useState, useEffect } from 'react';

export const useDebugMode = (): boolean => {
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsDebug(params.get('debug') === '1');
  }, []);

  return isDebug;
};
