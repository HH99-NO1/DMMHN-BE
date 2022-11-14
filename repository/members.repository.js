const Members = require("../models/members");

class MembersRepository {
  //member DB에 유저의 정보를 저장한다
  createMembers = async (memberEmail, hashedPw) => {
    const createMembersData = await Members.create({
      memberEmail,
      password: hashedPw,
      expiration: "false",
    });
    return createMembersData;
  };

  // 회원가입시 expiration 모델에 유저의 정보를 expiration === "false"로 저장한다
  // ExpirationMember = async (memberEmail, hashedPw) => {
  //   await expiration.create({ memberEmail, hashedPw, expiration: "false" });
  //   return;
  // };

  // expiration 모델의 updatedAt을 최신 날짜로 업데이트
  updateLoginHistory = async (memberEmail) => {
    await Members.findOneAndUpdate(
      { memberEmail },
      { loginHistory: String(new Date()) }
    );
    return;
  };

  checkMembersIdDup = async (memberEmail) => {
    const checkmem = await Members.findOne({ memberEmail });
    return checkmem;
  };

  loginMembers = async (memberEmail) => {
    const findOneMember = await Members.findOne({
      memberEmail,
    });
    return findOneMember;
  };

  findOneMember = async (_id) => {
    const findOneMember = await Members.findById(_id);
    return findOneMember;
  };

  updateMember = async (memberEmail, password) => {
    await Members.findOneAndUpdate({ memberEmail }, { password });
    return;
  };

  deleteMember = async (_id) => {
    await Members.findByIdAndDelete({ _id });
    return;
  };
}

module.exports = MembersRepository;
