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
  console.log("socket: ", socket);

  socket.on("join_room", async (data) => {
    console.log("join_room: ", data);

    socket.join(data);
  });

  //   socket.on("ice", () => {
  //     socket.to().emit("ice");
  //   });

  socket.on("offer", (sdp, roomName) => {
    console.log("offer: ", sdp);
    console.log("offer: ", roomName);

    socket.to(roomName).emit("offer", sdp);
  });

  socket.on("answer", (sdp, roomName) => {
    console.log("answer: ", sdp);
    console.log("answer: ", roomName);

    socket.to(roomName).emit("answer", sdp);
  });

  socket.on("candidate", (candidate, roomName) => {
    console.log("candidate: ", candidate);
    console.log("candidate: ", roomName);

    // candidate를 전달받고 방의 다른 유저들에게 전달해 줍니다.
    socket.to(roomName).emit("candidate", candidate);
  });
});

module.exports = { server };
