import { useState } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState(['Hello'])

  const sendMessage = (e) => {
    e.preventDefault();
    alert(message);
    setMessage('')
  }

  return (
    <>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} /> <button onClick={sendMessage}>Send</button>
      {
        allMessages.map((data, index) => {
          return <p key={index}></p>
        })
      }
    </>
  )
}

export default App
