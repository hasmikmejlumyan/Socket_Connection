import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';

function App () {
  const [room, setRoom] = useState('');

  const [message, setMessage] = useState('');
  const [messageRecieved, setMessageRecieved] = useState('');

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    setMessageRecieved(message);
    socket.emit("send_message", {message, room});
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
    })

    return () => {
      
    }
  }, [socket]);

  return (
    <div className="App">
      <input 
        type="text"
        placeholder='Room Number...'
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <br />

      <input 
        type="text"
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h1>Message :</h1>
      <p>{messageRecieved}</p>
    </div>
  );
}

export default App;
