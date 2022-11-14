const MembersService = require("../service/members.service");
const Joi = require("joi");
const membersSchema = Joi.object({
  memberEmail: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPw: Joi.string().required(),
});

class MembersController {
  membersService = new MembersService();

  createMembers = async (req, res, next) => {
    const { memberEmail, password, confirmPw } = req.body;
    try {
      await this.membersService.createMembers(memberEmail, password, confirmPw);

      await membersSchema.validateAsync(req.body);
      if (req.headers.authorization) {
        res.status(401).json({ errorMessage: "이미 로그인 된 계정입니다." });
        return;
      }
      console.log(req.body);
      if (password !== confirmPw) {
        res.status(401).json({
          errorMessage: "비밀번호가 비밀번호 확인란과 일치하지 않습니다.",
        });
        return;
      }
      res.status(201).json({ message: "회원가입에 성공했습니다" });
    } catch (err) {
      res.json(err.message);
    }
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
    try {
      const { memberEmail } = res.locals.members;
      const { password } = req.body;
      await this.membersService.updateMember(memberEmail, password);
      res.status(201).send({ message: "정보를 수정하였습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

  deleteMember = async (req, res, next) => {
    try {
      const { _id } = res.locals.members;
      await this.membersService.deleteMember(_id);
      res.status(200).send({ message: "회원탈퇴가 완료되었습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
}

module.exports = MembersController;
