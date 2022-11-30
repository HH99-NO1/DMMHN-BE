const express = require("express");
const router = express.Router();

const refresh = require("../jwt/refreshToken");
const authMiddleware = require("../middleware/auth_middleware");
const MembersController = require("../controller/members.controller");
const passport = require("passport");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);
router.post("/sendAuthCode", membersController.sendAuthCode);
router.post("/login", membersController.loginMembers);
router.get("/me", authMiddleware, membersController.getMemberInfo);

router.post("/refresh", refresh);
router.put("/", authMiddleware, membersController.updateMember);
router.delete("/", authMiddleware, membersController.deleteMember);

module.exports = router;
