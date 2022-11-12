const MembersService = require("../service/members.service");
const Joi = require("joi");

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
      res
        .status(400)
        .json({ error: "아이디 혹은 비밀번호가 일치하지 않습니다" });
    }
  };

  findOneMember = async (req, res, next) => {
    try {
      console.log(res.locals.members);
      const { id } = res.locals.members;
      const findOneMember = await this.membersService.findOneMember(id);
      res.status(200).send(findOneMember);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
}
module.exports = MembersController;
