const Members = require("../models/members");
const expiration = require("../models/expirationMember");

class MembersRepository {
  //member DB에 유저의 정보를 저장한다
  createMembers = async (memberEmail, password) => {
    try {
      await Members.create({
        memberEmail,
        password,
      });
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // 회원가입시 expiration 모델에 유저의 정보를 expiration === "false"로 저장한다
  ExpirationMember = async (memberEmail, password) => {
    await expiration.create({ memberEmail, password, expiration: "false" });
    return;
  };

  // expiration 모델의 updatedAt을 최신 날짜로 업데이트
  updateExpiration = async (memberEmail, password) => {
    await expiration.findOneAndUpdate(
      { memberEmail, password },
      { updatedAt: String(new Date()) }
    );
  };

  checkMembersIdDup = async (memberEmail) => {
    return await Members.findOne({ memberEmail });
  };

  loginMembers = async (memberEmail, password) => {
    const findOneMember = await Members.findOne({ memberEmail, password });
    return findOneMember;
  };

  findOneMember = async (_id) => {
    const findOneMember = await Members.findById(_id);
    return findOneMember;
  };

  expirationMember = async (memberEmail) => {
    await expiration.create({ memberEmail });
    return;
  };

  expirationCheck = async (memberEmail) => {
    const expirationMember = await expiration.findOne({ memberEmail });
    return expirationMember;
  };

  updateMember = async (memberEmail, password) => {
    await Members.findOneAndUpdate({ memberEmail }, { password });
    return;
  };
}

module.exports = MembersRepository;
