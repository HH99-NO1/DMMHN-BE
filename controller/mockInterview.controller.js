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
    const { category, number } = req.body;
    console.log("***controller req.body", req.body);

    try {
      const data = await this.mockInterviewService.getRandomQuestions(
        category,
        number
      );

      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  saveInterviewResults = async (req, res, next) => {
    const { memberEmail } = res.locals.members;
    console.log("**controller", memberEmail);
    const { category, number, result, totalTime } = req.body;

    try {
      await this.mockInterviewService.saveInterviewResults(
        memberEmail,
        category,
        number,
        result,
        totalTime
      );

      res.status(201).send("모의면접 결과가 저장되었습니다.");
    } catch(err) {
      res.status(400).send(err.message);
    }
  };

  getInterviewResults = async (req, res, next) => {
    const { memberEmail } = res.locals.members;
    try {
      const data = await this.mockInterviewService.getInterviewResults(memberEmail);
      
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(err.message);
    }
  };
}

module.exports = MockInterviewController;
