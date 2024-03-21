const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const mongodb = require("./mongodb.js");

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

async function connectToDB() {
  try {
    await mongodb.connectToSkins();
    console.log("Connected to skins collection");
    await mongodb.connectToUsers();
    console.log("Connected to users collection");

    const PORT = 3001;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
connectToDB();

app.get("/shopSkins", async (req, res) => {
  try {
    const skins = await mongodb.getSkins();
    res.send(skins);
  } catch (error) {
    console.error("Error getting skins: ", error);
  }
});

// const PORT = 3001;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
