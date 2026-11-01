import { useState, useEffect } from 'react';

/**
 * Hook to check if WebGL is supported by the client browser
 */
export function useWebGL() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(Boolean(gl));
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}

