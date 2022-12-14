const express = require("express");
const router = express.Router();
const refresh = require("../jwt/refreshToken");
const authMiddleware = require("../middleware/auth_middleware");
const upload = require("../middleware/upload_middleware");

const MembersController = require("../controller/members.controller");
const { Router } = require("express");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);
router.post("/sendAuthCode", membersController.sendAuthCode);
router.post("/login", membersController.loginMembers);
router.post("/authCodeForPassword", membersController.sendAuthCodeForPassword);
router.patch("/password", membersController.findPassword);
router.get("/me", authMiddleware, membersController.getMemberInfo);
router.post("/refresh", refresh);
router.patch(
  "/me",
  upload.single("profileImg"),
  authMiddleware,
  membersController.updateMember
);
// router.patch("/password", authMiddleware, membersController.changePassword);
router.delete("/me", authMiddleware, membersController.deleteMember);

module.exports = router;
