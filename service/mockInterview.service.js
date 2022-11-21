const MockInterviewRepository = require('../repository/mockInterview.repository');

const shuffling = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

class MockInterviewService {
    mockInterviewRepository = new MockInterviewRepository();

    shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    createQuestions = async (category, question) => {
        await this.mockInterviewRepository.createQuestions(category, question);
        return;
    };

    getRandomQuestions = async (category, numOfQuestions) => {
        const questions = await this.mockInterviewRepository.getRandomQuestions(category);
        const shuffledQue = this.shuffle(questions).slice(0, numOfQuestions);
        
        return shuffledQue;
    };
};

module.exports = MockInterviewService;