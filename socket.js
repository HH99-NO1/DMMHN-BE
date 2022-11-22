const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const MAXIMUM = 2;

io.on("connection", (socket) => {
  socket.on("join_room", async () => {
    socket.join();
  });

  socket.on("ice", () => {
    socket.to().emit("ice");
  });

  socket.on("offer", () => {
    socket.to().emit("offer");
  });

  socket.on("answer", () => {
    socket.to().emit("answer");
  });

  socket.on("disconnecting", async () => {});
});

module.exports = { server };
