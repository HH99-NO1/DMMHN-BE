const Members = require("../models/members");

class MembersRepository {
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
}

module.exports = MembersRepository;