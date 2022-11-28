const MembersService = require("../service/members.service");
const Joi = require("joi");
const membersSchema = Joi.object({
  memberEmail: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPw: Joi.string().required(),
});
const authCode = "";

class MembersController {
  membersService = new MembersService();

  sendAuthCode = async (req, res, next) => {
    const { memberEmail } = req.body;
    const authCode = await this.membersService.sendAuthCode(memberEmail);

    res.status(200).json({ data: authCode, message: "Sent Auth Email" });
  };

  createMembers = async (req, res, next) => {
    const { memberEmail, password, confirmPw, memberName, phoneNum, gender } =
      req.body;

    if (req.headers.authorization) {
      res.status(401).json({ errorMessage: "이미 로그인 된 계정입니다." });
      return;
    }

    try {
      await this.membersService.createMembers(
        memberEmail,
        password,
        confirmPw,
        memberName,
        phoneNum,
        gender
        // authCode
      );
      res.status(201).json({ message: "회원가입에 성공했습니다" });
    } catch (err) {
      res.status(400).json(err.message);
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

  getMemberInfo = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { _id, memberEmail } = res.locals.members;
      console.log(memberEmail);
      const getMemberInfo = await this.membersService.getMemberInfo(_id);
      res.status(200).send(getMemberInfo);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };

  updateMember = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
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
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { _id } = res.locals.members;
      await this.membersService.deleteMember(_id);
      res.status(200).send({ message: "회원탈퇴가 완료되었습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };
}

module.exports = MembersController;

const array = [1, 2, 3, 4];
console.log(array[array.length - 1]);
