const MockInterviewService = require("../service/mockInterview.service");
const logger = require("../config/logger");
const fs = require("fs");
require("dotenv").config();

const tts_id = process.env.TTS_ID;
const tts_secret = process.env.TTS_SECRET;

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

  createCustomQuestions = async (req, res, next) => {
    const { category, question } = req.body;
    const { memberEmail } = res.locals.members;
    
    try {
      await this.mockInterviewService.createQuestions(category, question, memberEmail);
      
      res.status(201).send("커스텀 면접 질문을 생성하였습니다.");
    } catch (err) {
      res.status(400).send(err.message);
    };
  };
  
  getCustomQuestions = async (req, res, next) => {
    const { memberEmail } = res.locals.members;
    
    try {
      const data = await this.mockInterviewService.getCustomQuestions(memberEmail);

      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    };
  };

  getRandomQuestions = async (req, res, next) => {
    const { category, number } = req.body;

    try {
      const data = await this.mockInterviewService.getRandomQuestions(
        category,
        number
      );

      res.status(200).json(data);
    } catch (err) {
      logger.error(err);
      res.status(400).send(err.message);
    }
  };

  getQuestionsVoice = async (req, res, next) => {
    const { question } = req.body;
    const api_url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
    const request = require("request");
    const options = {
      url: api_url,
      form: {
        speaker: "nara",
        volume: "0",
        speed: "0",
        pitch: "0",
        text: question,
        format: "mp3",
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": tts_id,
        "X-NCP-APIGW-API-KEY": tts_secret,
      },
    };
    try {
      const writeStream = fs.createWriteStream(`./voice/tts1.mp3`);
      logger.info("here comes!");
      const _req = request.post(options).on("response", function (response) {
        console.log(response.statusCode);
        console.log(response.headers["content-type"]);
      });
      _req.pipe(writeStream);
      _req.pipe(res);
    } catch (err) {
      logger.error(err.message);
      res.status(400).send({message: err.message});
    }
  };

  saveInterviewResults = async (req, res, next) => {
    const { memberEmail } = res.locals.members;
    const { category, number, result, totalTime } = req.body;

    try {
      const data = await this.mockInterviewService.saveInterviewResults(
        memberEmail,
        category,
        number,
        result,
        totalTime
      );

      res
        .status(201)
        .json({ sequence: data, message: "모의면접 결과가 저장되었습니다." });
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  getInterviewResults = async (req, res, next) => {
    const { memberEmail } = res.locals.members;
    try {
      const data = await this.mockInterviewService.getInterviewResults(
        memberEmail
      );

      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  getInterviewResultDetails = async (req, res, next) => {
    const { sequence } = req.params;
    
    try {
      const data = await this.mockInterviewService.getInterviewResultDetails(
        sequence
        );

      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  deleteInterviewResult = async (req, res, next) => {
    const { sequence } = req.params;

    try {
      await this.mockInterviewService.deleteInterviewResult(sequence);

      res.status(200).send("모의 면접 결과가 정상적으로 삭제되었습니다.");
    } catch (err) {
      res.status(400).send(err.message);
    };
    
  };
}

module.exports = MockInterviewController;
