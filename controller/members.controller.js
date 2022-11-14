const MembersService = require("../service/members.service");
const Joi = require("joi");
const membersSchema = Joi.object({
  memberEmail: Joi.string().email().required(),
  password: Joi.string().required(),
});

class MembersController {
  membersService = new MembersService();

  createMembers = async (req, res, next) => {
    const { memberEmail, password } = req.body;
    await this.membersService.createMembers(memberEmail, password);
    res.status(201).json({ message: "회원가입 되었습니다." });
  };

  loginMembers = async (req, res, next) => {
    try {
      const { memberEmail, password } = req.body;
      const loginMembers = await this.membersService.loginMembers(
        memberEmail,
        password
      );
      res.status(200).json({ message: "로그인 완료", data: loginMembers });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

  findOneMember = async (req, res, next) => {
    try {
      const { _id } = res.locals.members;
      const findOneMember = await this.membersService.findOneMember(_id);
      res.status(200).send(findOneMember);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

  updateMember = async (req, res, next) => {
    console.log(res.locals.member);
    const { memberEmail } = res.locals.members;
    const { password } = req.body;
    await this.membersService.updateMember(memberEmail, password);
    res.status(201).send({ message: "정보를 수정하였습니다" });
  };
}
module.exports = MembersController;
