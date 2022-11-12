const MembersRepository = require("../repository/members.repository");
const jwt = require("../jwt/jwt-utils");
const refreshModel = require("../models/refresh");
class MembersService {
  membersRepository = new MembersRepository();

  createMembers = async (memberEmail, password) => {
    await this.membersRepository.createMembers(memberEmail, password);
  };

  loginMembers = async (memberEmail, password) => {
    try {
      const findOneMember = await this.membersRepository.loginMembers(
        memberEmail,
        password
      );
      if (!findOneMember) {
        throw new Error({
          message: "아이디 또는 비밀번호가 일치하지 않습니다",
        });
      } else {
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
}

module.exports = MembersService;