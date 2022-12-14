const Members = require("../models/members");
const refresh = require("../models/refresh");

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
  checkDuplicatedId = async (memberEmail) => {
    return await Members.findOne({ memberEmail });
  };

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
    const updateMember = await Members.findOneAndUpdate(
      { memberEmail },
      {
        birth,
        memberName,
        stack,
        job,
        gender,
      },
      { new: true }
    );
    return updateMember;
  };

  updateMemberImg = async (memberEmail, img) => {
    const updateMemberImg = await Members.findOneAndUpdate(
      { memberEmail },
      { img },
      { new: true }
    );
    return updateMemberImg;
  };

  changePassword = async (memberEmail, hashedPw) => {
    // logger.info(`/repository/members.repository@changePassword`);
    await Members.findOneAndUpdate({ memberEmail }, { password: hashedPw });
    return;
  };

  deleteRefreshToken = async (refreshToken) => {
    // logger.info(`/repository/members.repository@deleteRefreshToken`);
    await refresh.findOneAndDelete({ refreshToken });
    return;
  };

  deleteMember = async (memberEmail) => {
    await Members.findOneAndDelete({ memberEmail });
    return;
  };
}

module.exports = MembersRepository;
