const MembersService = require("../service/members.service");
const Sentry = require("@sentry/node");

class MembersController {
  membersService = new MembersService();

  sendAuthCode = async (req, res, next) => {
    const { memberEmail } = req.body;
    try {
      const message = await this.membersService.checkDuplicatedId(memberEmail);
      if (!message) {
        const authCode = await this.membersService.sendAuthCode(memberEmail);
        res.status(200).json({ data: authCode, message: "Sent Auth Email" });
      }
    } catch (err) {
      res.status(400).json(err.message);
      Sentry.captureException(err);
    }
  };

  createMembers = async (req, res, next) => {
    const {
      memberEmail,
      password,
      confirmPw,
      memberName,
      birth,
      job,
      stack,
      gender,
      validate,
    } = req.body;

    if (req.headers.authorization) {
      res.status(401).json({ errorMessage: "이미 로그인 된 계정입니다." });
    }

    try {
      await this.membersService.createMembers(
        memberEmail,
        password,
        confirmPw,
        memberName,
        birth,
        job,
        stack,
        gender,
        validate
      );
      res.status(201).json({ message: "회원가입에 성공했습니다" });
    } catch (err) {
      res.status(400).json(err.message);
      Sentry.captureException(err);
    }
  };

  loginMembers = async (req, res, next) => {
    try {
      const { memberEmail, password } = req.body;
      const loginMembers = await this.membersService.loginMembers(
        memberEmail,
        password
      );
      if (loginMembers) {
        res.status(200).json({ message: "로그인 완료", data: loginMembers });
      } else {
        res.status(401).send("가입되지 않은 이메일입니다.");
      }
    } catch (err) {
      res.status(400).json(err.message);
      Sentry.captureException(err);
    }
  };

  sendAuthCodeForPassword = async (req, res, next) => {
    const { memberEmail } = req.body;
    try {
      const message = await this.membersService.checkEmail(memberEmail);
      if (message) {
        const authCode = await this.membersService.sendAuthCodeForPassword(
          memberEmail
        );
        res.status(200).json({ data: authCode, message: "Sent Auth Email" });
      }
    } catch (err) {
      res.status(400).json(err.message);
      Sentry.captureException(err);
    }
  };

  findPassword = async (req, res, next) => {
    try {
      const { memberEmail, password, confirmPassword, validate } = req.body;
      await this.membersService.findPassword(
        memberEmail,
        password,
        confirmPassword,
        validate
      );
      res.status(201).send({ message: "비밀번호가 변경되었습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
      Sentry.captureException(err);
    }
  };

  getMemberInfo = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { memberEmail } = res.locals.members;
      const getMemberInfo = await this.membersService.getMemberInfo(
        memberEmail
      );
      res.status(200).send(getMemberInfo);
    } catch (err) {
      res.status(400).send({ message: err.message });
      Sentry.captureException(err);
    }
  };

  updateMember = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { memberEmail } = res.locals.members;
      const { birth, memberName, stack, job, gender } = req.body;
      const profileImg = req.file;
      const updateMemberImg = await this.membersService.updateMember(
        memberEmail,
        profileImg,
        birth,
        memberName,
        stack,
        job,
        gender
      );
      res
        .status(201)
        .send({ data: updateMemberImg, message: "정보를 수정하였습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
      Sentry.captureException(err);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { refresh } = req.headers;
      const { memberEmail } = res.locals.members;
      const { password, newPassword, confirmNewPassword } = req.body;
      await this.membersService.changePassword(
        memberEmail,
        password,
        newPassword,
        confirmNewPassword,
        refresh
      );
      res.status(201).send({ message: "비밀번호가 변경되었습니다" });
    } catch (err) {
      res.status(400).send({ message: err.message });
      Sentry.captureException(err);
    }
  };

  deleteMember = async (req, res, next) => {
    try {
      if (tokenInfo.message === "jwt expired") {
        res.status(401).send({ message: "jwt expired", ok: 6 });
        return;
      }
      const { memberEmail } = res.locals.members;
      const { password } = req.body;
      logger.info(`@controller, ${password}`);
      await this.membersService.deleteMember(memberEmail, password);
      res.status(201).send({ message: "회원탈퇴가 완료되었습니다" });
    } catch (err) {
      logger.error(`DELETE /members/me ${err.stack}`);
      res.status(400).send({ message: err.message });
      Sentry.captureException(err);
    }
  };
}

module.exports = MembersController;
