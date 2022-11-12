const MembersRepository = require("../repository/members.repository");

class MembersService {
  membersRepository = new MembersRepository();

  createMembers = async (memberEmail, password) => {
    await this.membersRepository.createMembers(memberEmail, password);
  };
}

module.exports = MembersService;
