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
}

module.exports = MembersRepository;
