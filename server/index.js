const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
        console.log('Message from client:', data);
        io.emit('message', 'Message received: ' + data); // Broadcasting the received message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});