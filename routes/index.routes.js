const express = require("express");
const router = express.Router();
const membersRouter = require("./members");

router.use("/members", membersRouter);

module.exports = router;
