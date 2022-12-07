const MockInterviewRepository = require("../repository/mockInterview.repository");

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

class MockInterviewService {
  mockInterviewRepository = new MockInterviewRepository();

  createQuestions = async (category, question, memberEmail) => {
    await this.mockInterviewRepository.createQuestions(
      category,
      question,
      memberEmail
    );
    return;
  };

  getCustomQuestions = async (memberEmail) => {
    const result = await this.mockInterviewRepository.getCustomQuestions(
      memberEmail
    );

    const data = [];
    for (let i = 0; i < result.length; i++) {
      data.push({
        category: result[i].category,
        question: result[i].question,
      });
    }

    return data;
  };

  getRandomQuestions = async (category, number) => {
    const questions = await this.mockInterviewRepository.getRandomQuestions(
      category
    );
    const shuffledQue = shuffle(questions).slice(0, number);
    const questionArr = [];

    for (let i = 0; i < shuffledQue.length; i++) {
      questionArr.push(shuffledQue[i].question);
    }

    const data = { category, questionArr };

    return data;
  };

  saveInterviewResults = async (
    memberEmail,
    category,
    number,
    result,
    totalTime
  ) => {
    const data = await this.mockInterviewRepository.saveInterviewResults(
      memberEmail,
      category,
      number,
      result,
      totalTime
    );
    return data.sequence;
  };

  getInterviewResults = async (memberEmail) => {
    const result = await this.mockInterviewRepository.getInterviewResults(
      memberEmail
    );

    const data = [];

    for (let i = 0; i < result.length; i++) {
      data.push({
        sequence: result[i].sequence,
        category: result[i].category,
        number: result[i].number,
        totalTime: result[i].totalTime,
        createdAt: result[i].createdAt,
      });
    }

    return data;
  };

  getInterviewResultDetails = async (sequence) => {
    const result = await this.mockInterviewRepository.getInterviewResultDetails(
      sequence
    );

    const data = {
      sequence: result.sequence,
      category: result.category,
      number: result.number,
      totalTime: result.totalTime,
      resultsArr: result.result,
      createdAt: result.createdAt,
    };

    return data;
  };

  deleteInterviewResult = async (sequence) => {
    await this.mockInterviewRepository.deleteInterviewResult(sequence);

    return;
  };
}

module.exports = MockInterviewService;
