import { useEffect, useState } from 'react';

export function useFetch(url, initialValue) {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }

        const resData = await response.json();
        setFetchedData(resData);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsLoading(false);
    }

    fetchData();
  }, [url]);

  return {
    isLoading,
    fetchedData,
    error,
  };
}
