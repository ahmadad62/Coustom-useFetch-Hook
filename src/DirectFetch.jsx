import { useEffect, useState } from "react";
import BlogList from "./BlogList";

export default function Home() {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(response => {
                    if (!response.ok) {
                        throw Error('could not fetch comments from server');
                    }
                })
                .then(data => {
                    setBlogs(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    setError(err.message)
                    setIsPending(false)

                });
        }, 1000)
    }, []);

    return (
        <>
            {error && <div>{error}</div>}
            {isPending && <div>Loading ....</div>}
            {blogs && <BlogList blogs={blogs} title="All data from blogs" />}
        </>
    );
}