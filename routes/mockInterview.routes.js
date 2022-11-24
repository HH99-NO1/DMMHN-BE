const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const MockInterviewController = require("../controller/mockInterview.controller");
const mockInterviewController = new MockInterviewController();

router.post("/", mockInterviewController.createQuestions);
router.get("/", authMiddleware, mockInterviewController.getRandomQuestions);

module.exports = router;
