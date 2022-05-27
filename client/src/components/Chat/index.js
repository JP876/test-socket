import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const { search } = useLocation();

    const handleSendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    useEffect(() => {
        const { name, room } = queryString.parse(search);

        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, () => {});

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevState => [...prevState, message]);
        });
    }, []);

    console.log(message, messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => (e.key === 'Enter' ? handleSendMessage(e) : null)}
                />
            </div>
        </div>
    );
};

export default Chat;
