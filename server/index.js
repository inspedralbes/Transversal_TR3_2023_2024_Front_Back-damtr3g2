const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

io.on("connection",function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  
});
