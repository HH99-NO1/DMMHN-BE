const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");
const logging = require("../middleware/winston_middleware");

const MockInterviewController = require("../controller/mockInterview.controller");
const mockInterviewController = new MockInterviewController();

router.post("/createQuestions", mockInterviewController.createQuestions);
router.post("/custom", authMiddleware, mockInterviewController.createCustomQuestions);
router.get("/custom", authMiddleware, mockInterviewController.getCustomQuestions);
router.delete("/custom/:questionId", authMiddleware, mockInterviewController.deleteCustomQuestions);
router.post("/", authMiddleware, mockInterviewController.getRandomQuestions);
router.post("/getQuestionsVoice", mockInterviewController.getQuestionsVoice);
router.post("/saveResults", authMiddleware, mockInterviewController.saveInterviewResults);
router.get("/getResults", authMiddleware, mockInterviewController.getInterviewResults);
router.get("/getResultDetails/:sequence", authMiddleware, mockInterviewController.getInterviewResultDetails);
router.delete("/detail/:sequence", authMiddleware, mockInterviewController.deleteInterviewResult);

module.exports = router;
