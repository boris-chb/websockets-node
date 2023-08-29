const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("user connected");

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });

  socket.on("new video", metadata => {
    io.emit("new video", metadata);
  });

  socket.on("save", msg => {
    io.emit("save", msg);
  });

  socket.on("submit", msg => {
    io.emit("submit", msg);
  });

  socket.on("strike", ({ msg }) => {
    io.emit("strike", msg);
  });

  socket.on("approve", ({ language }) => {
    io.emit("approve", { language });
  });

  socket.on("delete review", () => {
    io.emit("delete review");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on localhost:3000");
});