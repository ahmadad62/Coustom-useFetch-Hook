import { useState, useEffect } from 'react';
import BlogList from './BlogList';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments', { signal: abortCont.signal });
        if (!response.ok) {
          throw new Error('Could not fetch comments from server');
        }
        const data = await response.json();
        setBlogs(data);
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
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading ....</div>}
      {blogs && <BlogList blogs={blogs} title="All data from blogs" />}
    </>
  );
}


// In this code, we wrap the fetch request and JSON parsing in a try/catch block. If the request is unsuccessful or there's an error parsing the response, we throw a new error with a custom message. In the catch block, we check if the error was caused by the fetch being aborted (by checking the name property of the error object), and if not, we set the error state and isPending state to indicate that there was an error fetching the data.

// In this version of the code, the fetchData function is declared as an async function that uses await to wait for the fetch response and JSON data to be returned. The try/catch block is used to handle any errors that might occur during the fetch request or JSON parsing.