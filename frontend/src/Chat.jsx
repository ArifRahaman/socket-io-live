import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

function Chat({ username, room }) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.emit('joinRoom', { username, room });
        socket.on('message', (data) => {
            setMessageList((list) => [...list, data]);
        });

        return () => {
            socket.off('message');
        };
    }, [room, username]);

    const sendMessage = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                username: username,
                text: message,
            };

            await socket.emit('chatMessage', messageData);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen py-6 w-3/4">
            <div className="bg-blue-500 text-white p-4">
                <p>Live Chat</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 ">
                {messageList.map((msg, index) => (
                    <div key={index} className={`mb-4 p-2 rounded ${msg.username === username ? 'bg-green-400 justify-start' : 'bg-gray-200 justify-end'}`}>
                        <p className={`${msg.username === username ? 'text-green-900' : 'text-gray-900'} font-bold`}>{msg.username}:</p>
                        <p className={`${msg.username === username ? 'text-green-900' : 'text-gray-900'}`}>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 flex">
                <input
                    type="text"
                    placeholder="Hey..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) => {
                        event.key === 'Enter' && sendMessage();
                    }}
                    className="flex-1 p-2 border rounded mr-2"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
