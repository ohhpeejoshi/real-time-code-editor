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

console.log('Socket server running');

io.on("connection", (socket) => {
    console.log('a user connected', socket.id);
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


