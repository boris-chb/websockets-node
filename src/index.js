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
  console.log("user connected", socket.client.request.socket.remoteAddress);

  socket.on("new video", metadata => {
    io.emit("new video", metadata);
  });

  socket.on("approve", ({ language }) => {
    io.emit("approve", { language });
  });

  socket.on("route", ({ target }) => {
    io.emit("route", { target });
  });

  socket.on("strike", msg => {
    io.emit("strike", msg);
  });

  socket.on("save", () => {
    io.emit("save");
  });

  socket.on("submit", () => {
    io.emit("submit");
  });

  socket.on("delete review", () => {
    io.emit("delete review");
  });

  socket.on("seek to", timestampStr => {
    io.emit("seek to", timestampStr);
  });

  socket.on("add note", note => {
    io.emit("add note", note);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

server.listen(3001, () => {
  console.log("listening on localhost:3001");
});
