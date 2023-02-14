import  { useState, useEffect } from 'react';

export default function MyComponent() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = new WebSocket('wss://example.com');

    socket.addEventListener('open', () => {
      console.log('WebSocket connected!');
    });

    socket.addEventListener('message', event => {
      setMessage(event.data);
    });

    socket.addEventListener('error', event => {
      setError('WebSocket error!');
    });

    socket.addEventListener('close', event => {
      console.log('WebSocket closed!');
      setError('WebSocket connection closed.');
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {message && <p>Message: {message}</p>}
    </div>
  );
}


// In this example, we create a new WebSocket using the WebSocket constructor and pass in the URL of the WebSocket server. We then add event listeners to the socket object to handle the open and message events. When a message is received from the server, we update the state of the component with the setMessage function.

// The useEffect hook is used to set up and tear down the WebSocket connection. We pass an empty array as the second argument to indicate that the effect should only run once, when the component mounts. When the component unmounts, the return function is called, which closes the WebSocket connection.

// Note that this is a simplified example and you may need to add error handling and other features to make it suitable for your specific use case.

// In this updated example, we've added a new state variable called error to store any errors that occur during the WebSocket connection. We've also added event listeners for the error and close events to handle any errors or unexpected disconnections.

// If an error occurs, we set the error state variable to a message indicating that an error has occurred. Similarly, if the WebSocket connection is closed, we set the error state variable to a message indicating that the connection has been closed.

// We've also updated the JSX to conditionally render the error message and the message received from the server. This way, the user can see both the error message and the message received from the server.

// Note that this is still a simplified example, and you may need to customize it further based on your specific needs.