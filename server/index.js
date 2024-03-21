const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

// Objeto para mantener el recuento de jugadores en cada sala
const roomPlayers = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createRoom', (roomName, creatorId) => {
        socket.join(roomName);
        roomPlayers[roomName] = { knight: creatorId, witch: null }; // Almacenar el creador de la sala como knight
        console.log(`Room created: ${roomName}`);
        socket.emit('roomCreated', roomName, 'knight'); // Notificar al cliente que la sala ha sido creada y su rol es knight
    });
    
    socket.on('joinRoom', (roomName, playerId) => {
        socket.join(roomName);
        roomPlayers[roomName].witch = playerId; // Asignar al nuevo jugador el rol de witch
        console.log(`User joined room: ${roomName}`);
    
        // Verificar si hay dos jugadores en la sala
        if (roomPlayers[roomName].witch !== null) {
            // Emitir el evento de comenzar partida a todos los jugadores en la sala
            io.to(roomPlayers[roomName].knight).emit('startGame', 'knight'); // Informar al jugador que es el knight
            io.to(roomPlayers[roomName].witch).emit('startGame', 'witch'); // Informar al jugador que es la witch
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

    socket.on("knightJump",(data)=>{
        console.log("knightJump",data);
        io.to(data).emit('knightJumping');
    })

    socket.on("witchWaterBall",(data)=>{
        console.log("witchWaterBall",data);
        io.to(data).emit('witchWaterBalling');
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
