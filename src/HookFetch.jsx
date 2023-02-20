

import { useFetch } from '../src/hooks/useFetch';
import BlogList from './BlogList';

export default function Home() {
  const { data, isPending, error } = useFetch('https://jsonplaceholder.typicode.com/comments');

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading ....</div>}
      {data && <BlogList blogs={data} title="All data from blogs" />}
    </>
  );
}

// In this example, we import the useFetch hook and call it with the desired URL. We then destructure the returned object to get the data, isPending, and error states and use them to render the appropriate content in the component.