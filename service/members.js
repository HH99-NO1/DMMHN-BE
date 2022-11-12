const MembersRepository = require("../repository/members");

class MembersService {
  membersRepository = new MembersRepository();

  createMembers = async (memberEmail, password) => {
    await this.membersRepository.createMembers(memberEmail, password);
  };
}

module.exports = MembersService;
