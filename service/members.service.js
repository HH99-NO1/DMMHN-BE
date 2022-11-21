const MembersRepository = require("../repository/members.repository");
const jwt = require("../jwt/jwt-utils");
const bcrypt = require("bcrypt");
const refreshModel = require("../models/refresh");
const nodemailer = require("nodemailer");
require("dotenv").config();

class MembersService {
  membersRepository = new MembersRepository();

  authCode = async (email) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    transporter.sendMail({
      from: `"떨면 뭐하니" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subcect: "떨면 뭐하니 Auth Number",
      text: "인증코드를 입력해주세요",
    });
    return "text";
  };

  createMembers = async (
    memberEmail,
    password,
    confirmPw,
    memberName,
    phoneNum,
    gender,
    personalNum
  ) => {
    //     try {
    if (password !== confirmPw) {
      throw new Error("비밀번호와 비밀번화 확인이 일치하지 않습니다");
    }
    const result = await this.membersRepository.findOneMember(memberEmail);
    if (result) {
      throw new Error("이미 가입된 계정입니다.");
    }
    const hashedPw = bcrypt.hashSync(password, 10);
    await this.membersRepository.createMembers(
      memberEmail,
      hashedPw,
      memberName,
      phoneNum,
      gender,
      personalNum
    );
    return;
    //  } catch (err) {
    //     throw new Error(err.message);
    //   }
  };

  loginMembers = async (memberEmail, password) => {
    try {
      // member DB에서 일치하는 유저가 있는지 찾아온다.
      const findOneMember = await this.membersRepository.loginMembers(
        memberEmail
      );

      if (!findOneMember) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }

      // // expiration 모델의 updatedAt을 최신 날짜로 업데이트
      await this.membersRepository.updateLoginHistory(memberEmail);
      // expiration 모델의 expiration 값이 true일 경우 에러 메세지를 띄운다
      if (findOneMember.expiration === "true") {
        throw new Error("장기간 미접속으로 정지된 회원입니다");
      }

      // DB에서 가져온 유저의 비밀번호와 입력한 비밀번호가 일치하는지 확인한다.
      const match = await bcrypt.compare(password, findOneMember.password);

      // 일치하는 유저가 없을 경우 에러 메세지를 띄운다
      if (!match) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      } else {
        // 일치하는 유저가 있을 경우 access, refresh 토큰을 발급한다
        const accessToken = jwt.sign(findOneMember);
        const refreshToken = jwt.refreshSign(findOneMember);
        await refreshModel.create({ refreshToken: `Bearer ${refreshToken}` });
        return {
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`,
        };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  findOneMember = async (memberEmail) => {
    try {
      const findOneMember = await this.membersRepository.findOneMember(
        memberEmail
      );
      return findOneMember;
    } catch (err) {
      throw new Error({ message: err.message });
    }
  };

  updateMember = async (memberEmail, password) => {
    await this.membersRepository.updateMember(memberEmail, password);
    return;
  };

  deleteMember = async (_id) => {
    await this.membersRepository.deleteMember(_id);
    return;
  };
}

module.exports = MembersService;
