const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");
const logging = require("../middleware/winston_middleware");

const MockInterviewController = require("../controller/mockInterview.controller");
const mockInterviewController = new MockInterviewController();

router.post("/createQuestions", mockInterviewController.createQuestions);
router.post("/", authMiddleware, mockInterviewController.getRandomQuestions);
router.post("/saveResults", authMiddleware, mockInterviewController.saveInterviewResults);
router.get("/getResults", authMiddleware, mockInterviewController.getInterviewResults);
router.get("/getResultDetails/:sequence", authMiddleware, mockInterviewController.getInterviewResultDetails);

module.exports = router;
