const Members = require("../models/members");
const refresh = require("../models/refresh");
const logger = require("../config/logger");

class MembersRepository {
  //member DB에 유저의 정보를 저장한다
  createMembers = async (
    memberEmail,
    hashedPw,
    memberName,
    birth,
    job,
    stack,
    gender
  ) => {
    await Members.create({
      memberEmail,
      password: hashedPw,
      expiration: "false",
      memberName,
      birth,
      job,
      stack,
      gender,
    });
    return;
  };
  checkDuplicatedId = async (memberEmail)=>{
    return  await Members.findOne({memberEmail});
  }

  // expiration 모델의 updatedAt을 최신 날짜로 업데이트
  updateLoginHistory = async (memberEmail) => {
    await Members.findOneAndUpdate(
      { memberEmail },
      { loginHistory: String(new Date()) }
    );
    return;
  };

  findOneMember = async (memberEmail) => {
    const findOneMember = await Members.findOne({ memberEmail });
    return findOneMember;
  };

  updateMember = async (memberEmail, birth, memberName, stack, job, gender) => {
    await Members.findOneAndUpdate(
      { memberEmail },
      {
        birth,
        memberName,
        stack,
        job,
        gender,
      }
    );
    return;
  };

  updateMemberImg = async (memberEmail, img) => {
    logger.info(`/repository/members.repository@updateMemberWithImg`);
    await Members.findOneAndUpdate({ memberEmail }, { img });
    return;
  };

  changePassword = async (memberEmail, hashedPw) => {
    logger.info(`/repository/members.repository@changePassword`);
    await Members.findOneAndUpdate({ memberEmail }, { password: hashedPw });
    return;
  };

  deleteRefreshToken = async (refreshToken) => {
    logger.info(`/repository/members.repository@deleteRefreshToken`);
    await refresh.findOneAndDelete({ refreshToken });
    return;
  };

  deleteMember = async (memberEmail) => {
    await Members.findOneAndDelete({ memberEmail });
    console.log("repo통과");
    return;
  };
}

module.exports = MembersRepository;
