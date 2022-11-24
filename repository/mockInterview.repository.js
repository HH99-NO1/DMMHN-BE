const MockInterviews = require("../models/mockInterview");

class MockInterviewRepository {
  createQuestions = async (category, question) => {
    await MockInterviews.create({ category, question });
    return;
  };

  getRandomQuestions = async (category) => {
    const questions = await MockInterviews.find({ category });

    return questions;
  };
}

module.exports = MockInterviewRepository;
