const express = require("express");
const router = express.Router();

const MembersController = require("../controller/members");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);

module.exports = router;
