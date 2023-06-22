import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'

const app: Express = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.on("connection", (socket) => {
    console.log('user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
});

httpServer.listen(8080)