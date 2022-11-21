const MockInterviewService = require("../service/mockInterview.service");

class MockInterviewController {
  mockInterviewService = new MockInterviewService();

  createQuestions = async (req, res, next) => {
    const { category, question } = req.body;

    try {
        await this.mockInterviewService.createQuestions(category, question);

        res.status(201).send("면접 질문을 생성하였습니다.");
    } catch (err) {
        res.status(400).send(err.message);
    }
  };

  getRandomQuestions = async (req, res, next) => {
    const { category, numOfQuestions } = req.body;

    const questions = await this.mockInterviewService.getRandomQuestions(category, numOfQuestions);

    res.json({questions});
  };

};

module.exports = MockInterviewController;