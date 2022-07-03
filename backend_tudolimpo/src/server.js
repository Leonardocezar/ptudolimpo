require("dotenv").config();
require("./database");
const express = require("express");
const socketio = require("socket.io");
const apps = require("./app.js");
const http = require("http");
const app = express();

const server = http.Server(app);
const io = socketio(server);
io.on("connection", (socket) => {
  socket.on("disconnect", function () {
    io.emit("signOutUser");
  });
});
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(apps);
server.listen(process.env.PORT || 3333);
