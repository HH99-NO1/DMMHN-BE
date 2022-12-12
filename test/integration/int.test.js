const request = require("supertest");
const server = require("../../app");
const jwt = require("../../jwt/jwt-utils");
const MockInterviews = require("../../models/mockInterview");
require("dotenv").config();

const newMember = {
  memberEmail: "alstjq1234@naver.com",
  password: "asdf1111!",
  confirmPw: "asdf1111!",
  memberName: "kim",
  birth: "1996-09-17",
  job: "취준생",
  stack: "node.js",
  gender: "남",
  img: "https://dmmhn-bucket.s3.ap-northeast-2.amazonaws.com/profile-img/1670461131030_google.png",
  validate: process.env.AUTH_CODE_VALIDATE,
};

const member = {
  memberEmail: "alstjq1234@naver.com",
  password: "asdf1111!",
};

const wrongmember = {
  memberEmail: "alstjq1234@naver.com",
  password: "asdf1234",
};

const mockMember = {
  memberEmail: "dpekfa144@naver.com",
  password: "min871612!",
};

const memberTest = {
  customMemberId: "dpekfa144@naver.com",
};

const questions = {
  category: "node.js",
  question: "테스트 입니다.",
};

const customQuestions = {
  category: "costom",
  question: "커스텀 테스트 입니다.",
};

describe("members 테스트", () => {
  it("POST /members/signup", async () => {
    const response = await request(server)
      .post("/members/signup")
      .send(newMember);
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({ message: "회원가입에 성공했습니다" });
  });

  it("회원가입 시 이미 있는 ID일 경우", async () => {
    const response = await request(server)
      .post("/members/signup")
      .send(newMember);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual("이미 가입된 계정입니다.");
  });

  it("POST /members/login", async () => {
    const response = await request(server).post("/members/login").send(member);
    expect(response.statusCode).toBe(200);
  });

  it("로그인 시 비밀번호가 ID 또는 PW가 일치하지 않을 경우", async () => {
    const response = await request(server)
      .post("/members/login")
      .send(wrongmember);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual(
      "아이디 또는 비밀번호가 일치하지 않습니다"
    );
  });

  it("GET /members/me", async () => {
    const accessToken = jwt.sign(member);
    const response = await request(server)
      .get("/members/me")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
  });

  it("Patch /members/password", async () => {
    const accessToken = jwt.sign(member);
    const refreshToken = jwt.refreshSign(member);
    const response = await request(server)
      .patch("/members/password")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send({
        memberEmail: "alstjq__@naver.com",
        password: "asdf1111!",
        newPassword: "asdf1111!",
        confirmNewPassword: "asdf1111!",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      message: "비밀번호가 변경되었습니다",
    });
  });

  it("Patch /members/password 잘못된 비밀번호가 들어왔을 경우", async () => {
    const accessToken = jwt.sign(member);
    const refreshToken = jwt.refreshSign(member);
    const response = await request(server)
      .patch("/members/password")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send({
        memberEmail: "alstjq__@naver.com",
        password: "asdf1234!",
        newPassword: "asdf1234!",
        confirmNewPassword: "asdf1234!",
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "비밀번호가 일치하지 않습니다",
    });
  });

  it("delete /members/me 비밀번호가 틀렸을 경우", async () => {
    const accessToken = jwt.sign(member);
    const response = await request(server)
      .delete("/members/me")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ memberEmail: "alstjq__@naver.com", password: "asdf1111" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: "비밀번호가 일치하지 않습니다",
    });
  });

  it("delete /members/me", async () => {
    const accessToken = jwt.sign(member);
    const response = await request(server)
      .delete("/members/me")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ memberEmail: "alstjq__@naver.com", password: "asdf1111!" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      message: "회원탈퇴가 완료되었습니다",
    });
  });
});

describe("mockInterview 테스트", () => {
  it("Post /mockInterview/createQuestions", async () => {
    const accessToken = jwt.sign(mockMember);
    const refreshToken = jwt.refreshSign(mockMember);
    const response = await request(server)
      .post("/mockInterview/createQuestions")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send(questions);
    expect(response.statusCode).toBe(201);
    // expect(response.body).toStrictEqual("면접 질문을 생성하였습니다.");
  });

  it("Post /mockInterview/custom", async () => {
    const accessToken = jwt.sign(mockMember);
    const refreshToken = jwt.refreshSign(mockMember);
    const response = await request(server)
      .post("/mockInterview/custom")
      .set("Authorization", `Bearer ${accessToken}`)
      .set("refresh", `Bearer ${refreshToken}`)
      .send(customQuestions);
    expect(response.statusCode).toBe(201);
  });

  it("Get /mockInterview/custom", async () => {
    const accessToken = jwt.sign(mockMember);
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
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
  });
});
