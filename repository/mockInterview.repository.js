const MockInterviews = require("../models/mockInterview");
const MockInterviewResults = require("../models/mockInterviewResult");

class MockInterviewRepository {
  createQuestions = async (category, question) => {
    await MockInterviews.create({ category, question });
    return;
  };

  getRandomQuestions = async (category) => {
    const questions = await MockInterviews.find({ category });

    return questions;
  };

  saveInterviewResults = async (
    memberEmail,
    category,
    number,
    result,
    totalTime
  ) => {
    await MockInterviewResults.create({
      memberEmail,
      category,
      number,
      result,
      totalTime,
    });
    return;
  };

  getInterviewResults = async (memberEmail) => {
    const data = await MockInterviewResults.find({ memberEmail });
    return data;
  };

  getInterviewResultDetails = async (sequence) => {
    const data = await MockInterviewResults.findOne({ sequence });

    return data;
  };
}

module.exports = MockInterviewRepository;
