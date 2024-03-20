const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

// Objeto para mantener el recuento de jugadores en cada sala
const roomPlayers = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createRoom', (roomName) => {
        socket.join(roomName);
        roomPlayers[roomName] = 1; // Se crea la sala con un jugador
        console.log(`Room created: ${roomName}`);
        socket.emit('roomCreated', roomName); // Notificar al cliente que la sala ha sido creada
    });

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        roomPlayers[roomName] = (roomPlayers[roomName] || 0) + 1; // Incrementar el contador de jugadores en la sala
        console.log(`User joined room: ${roomName}`);

        // Verificar si hay dos jugadores en la sala
        if (roomPlayers[roomName] === 2) {
            // Emitir el evento de comenzar partida a todos los jugadores en la sala
            io.to(roomName).emit('startGame');
        }
    });

    socket.on('message', (data) => {
        console.log('Message from client:', data);
        io.to(data.room).emit('message', 'Message received: ' + data.text); // Transmitir el mensaje recibido a todos los clientes en la sala
    });

    socket.on("knightAttack",(data)=>{
        console.log("knightAttack",data);
        io.to(data).emit('knightAttacking', data);
    })

    socket.on("knightCrouch",(data)=>{
        console.log("knightCrouch",data);
        io.to(data).emit('knightCrouching', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Disminuir el contador de jugadores cuando un usuario se desconecta
        Object.keys(roomPlayers).forEach((roomName) => {
            if (socket.rooms.has(roomName)) {
                roomPlayers[roomName] -= 1;
                if (roomPlayers[roomName] <= 0) {
                    delete roomPlayers[roomName]; // Eliminar la sala si no hay jugadores en ella
                }
            }
        });
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
