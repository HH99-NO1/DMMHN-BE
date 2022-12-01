const MockInterviews = require("../models/mockInterview");
const MockInterviewResults = require("../models/mockInterviewResult");
// const { add, format } = require("date-fns");

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
    // const now = format(add(new Date(), { hours: 9 }), "yyyy-MM-dd HH:mm:ss");
    // console.log("@@@@", now);
    const data = await MockInterviewResults.create({
      memberEmail,
      category,
      number,
      result,
      totalTime,
      // createdAt: now,
      // updatedAt: now,
    });
    return data;
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
