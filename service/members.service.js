const MembersRepository = require("../repository/members.repository");
const jwt = require("../jwt/jwt-utils");
const bcrypt = require("bcrypt");
const refreshModel = require("../models/refresh");
require("dotenv").config();
const transPort = require("../config/email");
const { generateRandom } = require("../util/members.util");

class MembersService {
  membersRepository = new MembersRepository();

  sendAuthCode = async (memberEmail) => {
    const authCode = generateRandom(111111, 999999);

    const mailOptions = {
      from: `"떨면 뭐하니" <${process.env.NODEMAILER_USER}>`,
      to: memberEmail,
      subject: "[떨면 뭐하니] 인증 코드를 안내해드립니다.",
      html: `<h3>떨면 뭐하니 인증 코드</h3>

      <p>면접깡패 양성 프로그램 떨면 뭐하니에 오신 것을 환영합니다.</p>
      <p>아래의 인증 코드를 입력하시면 가입이 정상적으로 완료됩니다</p>
      
      <div style="background-color:lightgray">
          <h1>${authCode}</h1>
      </div>`,
    };

    try {
      transPort.sendMail(mailOptions);
      return authCode;
    } catch (err) {
      throw new Error("인증 코드 전송에 실패했습니다");
    }
  };

  createMembers = async (
    memberEmail,
    password,
    confirmPw,
    memberName,
    birth,
    job,
    stack,
    gender,
    validate
  ) => {
    if (password !== confirmPw) {
      throw new Error("비밀번호와 비밀번화 확인이 일치하지 않습니다");
    }
    if (validate !== process.env.AUTH_CODE_VALIDATE) {
      throw new Error("email 인증코드를 입력해주세요");
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
      birth,
      job,
      stack,
      gender,
      validate
    );
    return;
  };

  checkDuplicatedId = async (memberEmail) => {
    const findOneMember = await this.membersRepository.findOneMember(
      memberEmail
    );

    if (findOneMember) {
      throw new Error("이미 가입된 계정입니다.");
    }
    return;
  };
  checkEmail = async(memberEmail)=>{
    const findOneMember = await this.membersRepository.findOneMember(
      memberEmail
    )
    if(!findOneMember){     
      throw new Error("가입되지 않은 이메일입니다.회원가입 하시겠습니까?")
    }
    return findOneMember;
  }
  sendAuthCodeforPassword= async (memberEmail) => {
    const authCode = generateRandom(111111, 999999);

    const mailOptions = {
      from: `"떨면 뭐하니" <${process.env.NODEMAILER_USER}>`,
      to: memberEmail,
      subject: "[떨면 뭐하니] 인증 코드를 안내해드립니다.",
      html: `<h3>떨면 뭐하니 인증 코드</h3>

      <p>비밀번호 변경을 위한 인증 코드입니다.</p>
            
      <div style="background-color:lightgray">
          <h1>${authCode}</h1>
      </div>`,
    };

    try {
      transPort.sendMail(mailOptions);
      return authCode;
    } catch (err) {
      throw new Error("인증 코드 전송에 실패했습니다");
    }
  };


  findPassword = async (memberEmail, password, confirmPassword) => {
    try {
      const findOneMember = await this.membersRepository.findOneMember(
        memberEmail
      );      
      if (password !== confirmPassword) {
        throw new Error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
      }
      const hashedPw = bcrypt.hashSync(password, 10);
      await this.membersRepository.changePassword(memberEmail, hashedPw);
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  loginMembers = async (memberEmail, password) => {
    try {
      // member DB에서 일치하는 유저가 있는지 찾아온다.
      const findOneMember = await this.membersRepository.findOneMember(
        memberEmail
      );

      // memberEmail이 일치하는 유저가 있는지 확인
      if (!findOneMember) {
        // throw new Error("가입되지 않은 이메일입니다.");
        return;
      }

      // expiration 모델의 expiration 값이 true일 경우 에러 메세지를 띄운다
      if (findOneMember.expiration === "true") {
        throw new Error("장기간 미접속으로 정지된 회원입니다");
      }

      // DB에서 가져온 유저의 비밀번호와 입력한 비밀번호가 일치하는지 확인한다.
      const match = await bcrypt.compare(password, findOneMember.password);

      // 일치하는 유저가 없을 경우 에러 메세지를 띄운다
      if (!match) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }

      // 일치하는 유저가 있을 경우 access, refresh 토큰을 발급
      const accessToken = jwt.sign(findOneMember);
      const refreshToken = jwt.refreshSign(findOneMember);

      // refresh Token 을 DB에 저장한다
      await refreshModel.create({ refreshToken: `Bearer ${refreshToken}` });
      // expiration 모델의 updatedAt을 최신 날짜로 업데이트
      await this.membersRepository.updateLoginHistory(memberEmail);

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
      const getMemberInfo = await this.membersRepository.findOneMember(
        memberEmail
      );
      return getMemberInfo;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  updateMember = async (
    memberEmail,
    profileImg,
    birth,
    memberName,
    stack,
    job,
    gender
  ) => {
    try {
      if (!profileImg) {
        const updateMember = await this.membersRepository.updateMember(
          memberEmail,
          birth,
          memberName,
          stack,
          job,
          gender
        );
        return updateMember;
      } else if (profileImg) {
        const img = profileImg.location;
        const updateMemberImg = await this.membersRepository.updateMemberImg(
          memberEmail,
          img
        );
        return updateMemberImg;
      } else {
        throw new Error("회원 정보 수정에 실패하였습니다.");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  changePassword = async (
    memberEmail,
    password,
    newPassword,
    confirmNewPassword,
    refresh
  ) => {
    const findOneMember = await this.membersRepository.findOneMember(
      memberEmail
    );
    try {
      const match = await bcrypt.compare(password, findOneMember.password);
      if (!match) {
        throw new Error("비밀번호가 일치하지 않습니다");
      }
      if (newPassword !== confirmNewPassword) {
        throw new Error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
      }
      await this.membersRepository.deleteRefreshToken(refresh);
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
      await this.membersRepository.deleteMember(memberEmail);
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

module.exports = MembersService;
