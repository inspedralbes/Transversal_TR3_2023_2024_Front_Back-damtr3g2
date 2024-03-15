const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3001;

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
