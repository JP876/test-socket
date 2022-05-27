const express = require('express');
const http = require('http');

const { addUser, removeUser, getUser, getUserByRoom } = require('./users');
const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

io.on('connection', socket => {
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({ name, room, id: socket.id });

        if (error) return cb(error);

        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, welcome to the room ${user.room}`,
        });
        socket.broadcast
            .to(user.room)
            .emit('message', { user: 'admin', text: `${user.name}, has joined` });
        socket.join(user.room);
        cb();
    });

    socket.on('sendMessage', ({ message, cb }) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        cb();
    });

    socket.on('disconnect', () => {
        console.log('User has left');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
