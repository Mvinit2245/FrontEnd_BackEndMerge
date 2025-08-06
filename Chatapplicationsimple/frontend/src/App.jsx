import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState(['']);
  const socket = useRef(null); // persist socket across renders

  useEffect(() => {
    // Connect once
    socket.current = io('http://localhost:3000');

    // Listen for incoming messages
    socket.current.on('receive_message', (message) => {
      setAllMessages((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.current.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      {allMessages.map((data, index) => (
        <p key={index}>{data}</p>
      ))}
    </>
  );
}

export default App;
