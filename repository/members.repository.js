const Members = require("../models/members");
const refresh = require("../models/refresh");
const logger = require("../config/logger");

class MembersRepository {
  //member DB에 유저의 정보를 저장한다
  createMembers = async (
    memberEmail,
    hashedPw,
    memberName,
    phoneNum,
    gender
  ) => {
    await Members.create({
      memberEmail,
      password: hashedPw,
      expiration: "false",
      memberName,
      phoneNum,
      gender,
    });
    return;
  };

  // expiration 모델의 updatedAt을 최신 날짜로 업데이트
  updateLoginHistory = async (memberEmail) => {
    await Members.findOneAndUpdate(
      { memberEmail },
      { loginHistory: String(new Date()) }
    );
    return;
  };

  // checkMembersIdDup = async (memberEmail) => {
  //   const checkmem = await Members.findOne({ memberEmail });
  //   return checkmem;
  // };

  findOneMember = async (memberEmail) => {
    const findOneMember = await Members.findOne({
      memberEmail,
    });
    return findOneMember;
  };

  getMemberInfo = async (_id) => {
    const getMemberInfo = await Members.findOne({ _id });
    return getMemberInfo;
  };

  updateMember = async (memberEmail, password) => {
    await Members.findOneAndUpdate({ memberEmail }, { password });
    return;
  };

  updateMemberWithImg = async (memberEmail, img) => {
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

  deleteMember = async (_id) => {
    await Members.findByIdAndDelete({ _id });
    return;
  };
}

module.exports = MembersRepository;
