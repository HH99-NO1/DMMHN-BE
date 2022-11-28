const app = require("./app");
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// 어떤 방에 어떤 유저가 들어있는지
let users = {};
// socket.id기준으로 어떤 방에 들어있는지
let socketRoom = {};

const MAXIMUM = 2;

io.on("connection", (socket) => {
  console.log(socket.id, "connection");
  socket.on("join_room", (data) => {
    console.log("join_room: ", data);
    // 방이 기존에 생성되어 있다면
    if (users[data.room]) {
      console.log("27줄", users[data.room]);
      // 현재 입장하려는 방에 있는 인원수
      const currentRoomLength = users[data.room].length;
      if (currentRoomLength === MAXIMUM) {
        // 인원수가 꽉 찼다면 돌아갑니다.
        socket.to(socket.id).emit("room_full");
        return;
      }

      // 여분의 자리가 있다면 해당 방 배열에 추가해줍니다.
      users[data.room] = [...users[data.room], { id: socket.id }];
    } else {
      // 방이 존재하지 않다면 값을 생성하고 추가해줍시다.
      users[data.room] = [{ id: socket.id }];
    }
    socketRoom[socket.id] = data.room;

    console.log("입장 !!!!", data.room);
    // 입장
    socket.join(data.room);

    // 입장하기 전 해당 방의 다른 유저들이 있는지 확인하고
    // 다른 유저가 있었다면 offer-answer을 위해 알려줍니다.
    const others = users[data.room].filter((user) => user.id !== socket.id);
    if (others.length) {
      io.sockets.to(socket.id).emit("all_users", others);
    }
  });
  socket.on("candidate", (candidate, roomName) => {
    console.log("candidate :", candidate);
    console.log("candidate :", roomName);
    // candidate를 전달받고 방의 다른 유저들에게 전달해 줍니다.
    socket.to(roomName).emit("getCandidate", candidate);
    console.log("78번째줄 성공!");
  });

  socket.on("offer", (sdp, roomName) => {
    console.log("offer: ", sdp);
    console.log("offer: ", roomName);
    // offer를 전달받고 다른 유저들에게 전달해 줍니다.
    socket.to(roomName).emit("getOffer", sdp);
    console.log("61번째줄 성공");
  });

  socket.on("answer", (sdp, roomName) => {
    console.log("answer: ", sdp);
    console.log("answer: ", roomName);
    // answer를 전달받고 방의 다른 유저들에게 전달해 줍니다.
    socket.to(roomName).emit("getAnswer", sdp);
    console.log("70번째줄 성공!");
  });
});

module.exports = { server };

// const app = require("./app");
// const http = require("http");
// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("./middleware/auth_middleware");
// const Members = require("./models/members");
// const Room = require("./models/room");

// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     // methods: ["GET", "POST"],
//     // allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// // 어떤 방에 어떤 유저가 들어있는지
// let users = {};
// // socket.id기준으로 어떤 방에 들어있는지
// let socketRoom = {};

// const MAXIMUM = 2;

// app.get("/room/:roomName", authMiddleware, async (req, res) => {
//   console.log("들어옴");
//   const { roomName } = req.params;
//   const { memberEmail } = res.locals.members;

//   // const findMembers = await Members.findOne({ memberEmail });
//   // console.log("#####findmember", findMembers);

//   // const createRoom = await Room.create({
//   //   roomName,
//   //   user: memberEmail,
//   // });
//   // console.log("dbdbdb", createRoom);

//   io.on("connection", (socket) => {
//     console.log(memberEmail, "connection");
//     socket.on("join_room", async () => {
//       console.log("join_room: ", roomName, memberEmail);
//       // 방이 기존에 생성되어 있다면
//       // if (findRoom) {
//       //   console.log("27줄", findRoom);

//       //   // 현재 입장하려는 방에 있는 인원수
//       //   const numOfPeopleInRoom = findRoom.user.length;
//       //   if (numOfPeopleInRoom === MAXIMUM) {
//       //     // 인원수가 꽉 찼다면 돌아갑니다.
//       //     socket.to(user).emit("room_full");
//       //     return;
//       //   }

//       //   // 여분의 자리가 있다면 해당 방 배열에 추가해줍니다.
//       //   users[data.room] = [...users[data.room], { id: socket.id }];
//       // } else {
//       //   // 방이 존재하지 않다면 값을 생성하고 추가해줍시다.
//       //   users[data.room] = [{ id: socket.id }];
//       // }
//       // socketRoom[socket.id] = data.room;

//       // 입장
//       socket.join(roomName);
//       console.log("입장 !!!!", roomName);

//       // 입장하기 전 해당 방의 다른 유저들이 있는지 확인하고
//       // 다른 유저가 있었다면 offer-answer을 위해 알려줍니다.
//       // const others = users[roomName].filter((user) => user.id !== socket.id);
//       // if (others.length) {
//       //   io.sockets.to(socket.id).emit("all_users", others);
//       // }
//     });

//     socket.on("ice", (ice, remoteSocketId) => {
//       console.log("74 ice", ice, remoteSocketId);
//       socket.to(remoteSocketId).emit("ice", ice, socket.id);
//     });

//     socket.on("offer", (offer, remoteSocketId, localNickname) => {
//       console.log("79 offer", offer, remoteSocketId, localNickname);
//       socket.to(remoteSocketId).emit("offer", offer, socket.id, localNickname);
//     });

//     socket.on("answer", (answer, remoteSocketId) => {
//       console.log("84 ice", answer, remoteSocketId);
//       socket.to(remoteSocketId).emit("answer", answer, socket.id);
//     });

//     socket.on("disconnecting", async () => {
//       // delete mediaStatus[myRoomName][socket.id]
//       if (myNickname && myRoomName) {
//         console.log(`${myNickname}이 방 ${myRoomName}에서 퇴장`);
//       }
//       socket.to(myRoomName).emit("leave_room", socket.id);

//       // 나가면서 방의 정보를 업데이트 해주고 나가기
//       for (let i = 0; i < roomObjArr.length; i++) {
//         if (roomObjArr[i].roomName === myRoomName) {
//           const newUsers = roomObjArr[i].users.filter(
//             (user) => user.socketId !== socket.id
//           );
//           roomObjArr[i].users = newUsers;
//           roomObjArr[i].currentNum--;
//           console.log(
//             `방 ${myRoomName} (${roomObjArr[i].currentNum}/${MAXIMUM})`
//           );
//           break;
//         }
//       }

//       await Room.findByIdAndUpdate(myRoomName, {
//         $inc: { numberOfPeopleInRoom: -1 },
//       });

//       setTimeout(async () => {
//         const existRoom = await Room.findById(myRoomName);
//         if (existRoom?.numberOfPeopleInRoom <= 0) {
//           await Room.findByIdAndRemove(myRoomName);

//           const roomHistory = await RoomHistory.findOne({ roomId: myRoomName });
//           roomHistory.deletedAt = new Date();
//           await roomHistory.save();

//           const newRoomObjArr = roomObjArr.filter(
//             (roomObj) => roomObj.currentNum > 0
//           );
//           roomObjArr = newRoomObjArr;
//           delete mediaStatus[myRoomName];
//           console.log(`방 ${myRoomName} 삭제됨`);
//         }
//       }, 10000);
//     });

//     socket.on("emoji", (roomNameFromClient, socketIdFromClient) => {
//       socket.to(roomNameFromClient).emit("emoji", socketIdFromClient);
//     });

//     socket.on(
//       "screensaver",
//       (roomNameFromClient, socketIdFromClient, check) => {
//         if (!mediaStatus[roomNameFromClient][socketIdFromClient]) {
//           mediaStatus[roomNameFromClient][socketIdFromClient] = {};
//         }
//         mediaStatus[roomNameFromClient][socketIdFromClient].screensaver = check;
//         socket
//           .to(roomNameFromClient)
//           .emit("screensaver", socketIdFromClient, check);
//       }
//     );

//     socket.on("mic_check", (roomNameFromClient, socketIdFromClient, check) => {
//       if (!mediaStatus[roomNameFromClient][socketIdFromClient]) {
//         mediaStatus[roomNameFromClient][socketIdFromClient] = {};
//       }
//       mediaStatus[roomNameFromClient][socketIdFromClient].muted = check;
//       socket
//         .to(roomNameFromClient)
//         .emit("mic_check", socketIdFromClient, check);
//     });

//     socket.on("sendYoutubeTime", (time) => {
//       socket.emit("sendYoutubeTime", time);
//     });
//   });
// });

// module.exports = { server };
