const express = require("express");
const router = express.Router();

const MockInterviewController = require("../controller/mockInterview.controller");
const mockInterviewController = new MockInterviewController();

router.post("/", mockInterviewController.createQuestions);
router.get("/", mockInterviewController.getRandomQuestions);

module.exports = router;
