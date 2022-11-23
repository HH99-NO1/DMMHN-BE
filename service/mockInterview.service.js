const MockInterviewRepository = require('../repository/mockInterview.repository');

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

class MockInterviewService {
    mockInterviewRepository = new MockInterviewRepository();

    createQuestions = async (category, question) => {
        await this.mockInterviewRepository.createQuestions(category, question);
        return;
    };

    getRandomQuestions = async (category, numOfQuestions) => {
        const questions = await this.mockInterviewRepository.getRandomQuestions(category);
        const shuffledQue = shuffle(questions).slice(0, numOfQuestions);
        
        return shuffledQue;
    };
};

module.exports = MockInterviewService;