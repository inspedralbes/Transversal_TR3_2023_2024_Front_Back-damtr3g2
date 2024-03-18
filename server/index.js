const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createRoom', (roomName) => {
        socket.join(roomName);
        console.log(`Room created: ${roomName}`);
        socket.emit('roomCreated', roomName); // Notify the client that the room has been created
    });

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
    });

    socket.on('message', (data) => {
        console.log('Message from client:', data);
        io.to(data.room).emit('message', 'Message received: ' + data.text); // Broadcasting the received message to all clients in the room
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
