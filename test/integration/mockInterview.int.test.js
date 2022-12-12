const request = require("supertest");
const server = require("../../app");
const jwt = require("../../jwt/jwt-utils");
const MockInterviews = require("../../models/mockInterview");
require("dotenv").config();

const member = {
  memberEmail: "dpekfa144@naver.com",
  password: "min871612!",
};

const memberTest = {
  customMemberId: "dpekfa144@naver.com",
};

// const memberEmails = {
//   memberEmail: "dpekfa144@naver.com",
// };

const questions = {
  category: "node.js",
  question: "테스트 입니다.",
};

const customQuestions = {
  category: "costom",
  question: "커스텀 테스트 입니다.",
};

describe("mockInterview 테스트", () => {
  it("POST /members/login", async () => {
    const response = await request(server).post("/members/login").send(member);
    expect(response.statusCode).toBe(200);
  });

  it("Post /mockInterview/createQuestions", async () => {
    const accessToken = jwt.sign(member);
    const refreshToken = jwt.refreshSign(member);
    const response = await request(server)
      .post("/mockInterview/createQuestions")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send(questions);
    expect(response.statusCode).toBe(201);
    // expect(response.body).toStrictEqual("면접 질문을 생성하였습니다.");
  });

  it("Post /mockInterview/custom", async () => {
    const accessToken = jwt.sign(member);
    const refreshToken = jwt.refreshSign(member);
    const response = await request(server)
      .post("/mockInterview/custom")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send(customQuestions);
    expect(response.statusCode).toBe(201);
  });

  it("Get /mockInterview/custom", async () => {
    const accessToken = jwt.sign(member);
    const response = await request(server)
      .get("/mockInterview/custom")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
  });

  it("Delete /mockInterview/custom", async () => {
    const accessToken = jwt.sign(member);
    const data = await MockInterviews.findOne(memberTest);
    console.log(data.id);
    const response = await request(server)
      .delete(`/mockInterview/custom/${data.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.statusCode).toBe(200);
  });
});
