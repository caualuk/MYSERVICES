// hooks/useLoading.ts
import { useState, useCallback } from 'react';

export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const withLoading = useCallback(async <T,>(
    promise: Promise<T>,
    errorMessage = 'Ocorreu um erro'
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await promise;
      return result;
    } catch (err) {
      setError(errorMessage);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, withLoading };
}