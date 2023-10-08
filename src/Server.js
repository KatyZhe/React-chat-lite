const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.json());

const rooms = new Map();

app.get("/rooms", function (res, req) {
  rooms.set("hello", "");
  res.json(rooms);
});

app.post("/rooms", (res, req) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []]
    ]));
  }
  res.send();
});

io.on("connection", (socket) => {
  console.log("user connected", socket);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Сервер запущен!");
});
