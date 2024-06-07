const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));



io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);
    io.to(room).emit("message", {
      username: "Admin",
      text: `${username} has joined the room`,
    });
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.room).emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});








const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
