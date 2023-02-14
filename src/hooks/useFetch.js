import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchData() {
            try {
                const response = await fetch(url, { signal: abortCont.signal });

                if (!response.ok) {
                    throw new Error('Could not fetch data from server');
                }

                const data = await response.json();
                setData(data);
                setIsPending(false);
                setError(null);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    setError(error.message);
                    setIsPending(false);
                }
            }
        }

        fetchData();

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}


// This hook takes a URL as an argument and returns an object containing the data, isPending, and error states. The useEffect block fetches data from the specified URL, sets the states accordingly, and returns a cleanup function that aborts the fetch request if it's still in progress when the component is unmounted.