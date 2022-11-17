const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const refresh = require("../jwt/refreshToken");
const authMiddleware = require("../middleware/auth_middleware");
const MembersController = require("../controller/members.controller");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);
router.post("/login", membersController.loginMembers);
router.get("/me", authMiddleware, membersController.findOneMember);
router.get("/refresh", refresh, (req, res) => {});
router.put("/", authMiddleware, membersController.updateMember);
router.delete("/", authMiddleware, membersController.deleteMember);

module.exports = router;