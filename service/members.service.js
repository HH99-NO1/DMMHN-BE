const MembersRepository = require("../repository/members.repository");
const jwt = require("../jwt/jwt-utils");
const bcrypt = require("bcrypt");
const refreshModel = require("../models/refresh");
require("dotenv").config();
const transPort = require("../config/email");
const logger = require("../config/logger");

const generateRandom = function (min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const EMAIL_VALIDATION =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;

class MembersService {
  membersRepository = new MembersRepository();

  sendAuthCode = async (memberEmail) => {
    const authCode = generateRandom(111111, 999999);

    const mailOptions = {
      from: `"떨면 뭐하니" <${process.env.NODEMAILER_USER}>`,
      to: memberEmail,
      subcect: "떨면 뭐하니 Auth Number",
      text: "인증코드를 입력해주세요" + authCode,
    };

    transPort.sendMail(mailOptions, function (error, info) {
      if (error) {
        ctx.state = 500;
      }
    });

    return authCode;
  };

  createMembers = async (
    memberEmail,
    password,
    confirmPw,
    memberName,
    phoneNum,
    gender
  ) => {
    //     try {
    if (password !== confirmPw) {
      throw new Error("비밀번호와 비밀번화 확인이 일치하지 않습니다");
    }
    // if (!EMAIL_VALIDATION.test(memberEmail)) {
    //   throw new Error("이메일 형식을 맞춰주세요");
    // }
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
      gender
    );
    return;
    //  } catch (err) {
    //     throw new Error(err.message);
    //   }
  };

  loginMembers = async (memberEmail, password) => {
    try {
      // member DB에서 일치하는 유저가 있는지 찾아온다.
      const findOneMember = await this.membersRepository.findOneMember(
        memberEmail
      );

      // memberEmail이 일치하는 유저가 있는지 확인
      if (!findOneMember) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }

      // expiration 모델의 expiration 값이 true일 경우 에러 메세지를 띄운다
      if (findOneMember.expiration === "true") {
        throw new Error("장기간 미접속으로 정지된 회원입니다");
      }

      // DB에서 가져온 유저의 비밀번호와 입력한 비밀번호가 일치하는지 확인한다.
      const match = await bcrypt.compare(password, findOneMember.password);

      // 일치하는 유저가 없을 경우 에러 메세지를 띄운다
      console.log(match);
      if (!match) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }

      // expiration 모델의 updatedAt을 최신 날짜로 업데이트
      await this.membersRepository.updateLoginHistory(memberEmail);

      // 일치하는 유저가 있을 경우 access, refresh 토큰을
      const accessToken = jwt.sign(findOneMember);
      const refreshToken = jwt.refreshSign(findOneMember);
      await refreshModel.create({ refreshToken: `Bearer ${refreshToken}` });
      return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getMemberInfo = async (memberEmail) => {
    try {
      const getMemberInfo = await this.membersRepository.getMemberInfo(
        memberEmail
      );
      return {
        memberEmail: getMemberInfo.memberEmail,
        profileImg: getMemberInfo.img,
        createdAt: getMemberInfo.createdAt,
        updatedAt: getMemberInfo.updatedAt,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateMember = async (memberName, profileImg) => {
    logger.info(`/service/members.service`);
    try {
      if (!profileImg) {
        logger.info("@updateMember");
        await this.membersRepository.updateMember(memberEmail);
      } else if (profileImg) {
        const img = profileImg.location;
        logger.info(`@updateMemberWithImg / img : ${img}`);
        await this.membersRepository.updateMemberWithImg(memberEmail, img);
      } else {
        throw new Error("회원 정보 수정에 실패하였습니다.");
      }
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  changePassword = async (
    memberEmail,
    password,
    newPassword,
    confirmNewPassword,
    refreshToken
  ) => {
    logger.info(`/service/members.service@changePassword`);
    const findOneMember = await this.membersRepository.findOneMember(
      memberEmail
    );
    console.log(findOneMember);
    try {
      const match = await bcrypt.compare(password, findOneMember.password);
      if (!match) {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
      if (newPassword !== confirmNewPassword) {
        throw new Error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
      }
      await this.membersRepository.deleteRefreshToken(refreshToken);
      const hashedPw = bcrypt.hashSync(newPassword, 10);
      await this.membersRepository.changePassword(memberEmail, hashedPw);
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  deleteMember = async (memberEmail, password) => {
    try {
      const findOneMember = await this.membersRepository.findOneMember(
        memberEmail
      );
      const match = await bcrypt.compare(password, findOneMember.password);
      if (!match) {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
      console.log(match);
      await this.membersRepository.deleteMember(memberEmail);
      console.log(memberEmail);
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = MembersService;
