const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.post(":roomName", async (req, res) => {
  const { roomName } = req.params;
  await Room.create({ roomName });
  res.status(201).send({ message: "방 생성 성공" });
});

module.exports = router;
