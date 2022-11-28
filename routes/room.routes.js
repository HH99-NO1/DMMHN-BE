const express = require("express");
const auth_middleware = require("../middleware/auth_middleware");
const router = express.Router();
const Room = require("../models/room");

router.post("/:roomName", auth_middleware, async (req, res) => {
  const { roomName } = req.params;
  const { memberEmail } = res.locals.members;
  await Room.create({ roomName });

  console.log("routes POST", roomName, memberEmail);

  res.status(201).send({ message: "방 생성 성공" });
});

router.get("/:roomName", auth_middleware, async (req, res) => {
  const { roomName } = req.params;
  const { memberEmail } = res.locals.members;

  console.log("routes GET", roomName, memberEmail);
  
  res.status(200).json({ data: memberEmail, message: "방 입장 성공" });
});

module.exports = router;
