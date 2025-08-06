import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { io } from 'socket.io-client';

function App() {
  const [name, setName] = useState('')

  

  useEffect(() => {
    const socketInstance = io("http://localhost:3000/")

    socketInstance.on('updated-name',(data) => {
      setName(data)
    })
  },[])

  return (
    <>
       The Majority vote Goes to :  {name}
    </>
  )
}

export default App
