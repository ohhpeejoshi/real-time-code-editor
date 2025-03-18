import express from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", //we can use it everywhere
    },
});

const rooms = new Map(); // new store for rooms


io.on("connection", (socket) => {
    console.log('a user connected', socket.id);

    let currentRoom = null;
    let currentUser = null;

    socket.on('join', ({ roomId, userName }) => {
        if (currentRoom) {
            socket.leave(currentRoom);
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit('userJoined', Array.from(rooms.get(currentRoom)));
        }

        currentRoom = roomId;
        currentUser = userName;
        socket.join(roomId);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }

        rooms.get(roomId).add(userName);
        io.to(roomId).emit('userJoined', Array.from(rooms.get(roomId)));
        console.log('user joined room:', roomId, userName);
    });


});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


