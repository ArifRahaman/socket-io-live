// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      setShowChat(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-lg">
      {!showChat ? (
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h3 className="text-2xl mb-4">Join a Chat Room</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => setUsername(event.target.value)}
            className="block w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Room..."
            onChange={(event) => setRoom(event.target.value)}
            className="block w-full p-2 mb-4 border rounded"
          />
          <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded">
            Join Room
          </button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;
