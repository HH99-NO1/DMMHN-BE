const MembersService = require("../service/members");
const Joi = require("joi");

class MembersController {
  membersService = new MembersService();
  createMembers = async (req, res, next) => {
    
    const { memberEmail,password } = req.body;

    await this.membersService.createMembers(memberEmail, password);

    res.status(201).json({ message: "회원가입 되었습니다." });
  };
}
module.exports = MembersController;


