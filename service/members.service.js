const MembersRepository = require("../repository/members.repository");
const jwt = require("../jwt/jwt-utils");
const bcrypt = require('bcrypt')
const refreshModel = require("../models/refresh");

class MembersService {
  membersRepository = new MembersRepository();

  createMembers = async (memberEmail, password,confirmPw) => {
    const result = await this.membersRepository.checkMembersIdDup(memberEmail)
    console.log("result: ", result)
    if(result){
      throw new Error("이미 가입된 계정입니다.")
    }
      const hashedPw = bcrypt.hashSync(password,10)
      await this.membersRepository.createMembers(
        memberEmail,
        hashedPw,
        confirmPw
      );
    await this.membersRepository.ExpirationMember(memberEmail, password);
    return;
  };

  checkMembersIdDup = async(memberEmail)=>{
    const findOneMember = await this.membersRepository.findOneMember(memberEmail)

    if(findOneMember){
      throw new Error("이미 가입된 계정입니다.")
    }else{
      return "사용가능한 계정입니다."
    }
  }

  loginMembers = async (memberEmail, password) => {
    try {
      // member DB에서 일치하는 유저가 있는지 찾아온다.
      const findOneMember = await this.membersRepository.loginMembers(
        memberEmail,
        password
      );

      // expiration 모델에서 유저들의 정보를 가져온다
      const expirationMember = await this.membersRepository.expirationCheck(
        memberEmail
      );

      // expiration 모델의 expiration 값이 true일 경우 에러 메세지를 띄운다
      if (expirationMember.expiration === "true") {
        throw new Error("장기간 미접속으로 정지된 회원입니다");
      }

      // // expiration 모델의 updatedAt을 최신 날짜로 업데이트
      await this.membersRepository.updateExpiration(memberEmail, password);

      // 일치하는 유저가 없을 경우 에러 메세지를 띄운다
      if (!findOneMember) {
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

  findOneMember = async (_id) => {
    try {
      const findOneMember = await this.membersRepository.findOneMember(_id);
      return findOneMember;
    } catch (err) {
      throw new Error({ message: err.message });
    }
  };

  updateMember = async (memberEmail, password) => {
    await this.membersRepository.updateMember(memberEmail, password);
    return;
  };
}

module.exports = MembersService;
