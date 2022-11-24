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

    getRandomQuestions = async (category, number) => {
        const questions = await this.mockInterviewRepository.getRandomQuestions(category);
        const shuffledQue = shuffle(questions).slice(0, number);
        let questionArr = [];
        
        for(let i = 0; i < shuffledQue.length; i++) {
            questionArr.push(shuffledQue[i].question);
        }
        
        const data = { category, questionArr };
        
        return data;
    };
};

module.exports = MockInterviewService;