const CompanyRepository = require("../repository/company.repository");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/company");
const jwt = require("../jwt/jwt-utils");
const refreshModel = require("../models/refresh");

class CompanyService {
  companyRepository = new CompanyRepository();

  createCompany = async (companyName, password, confirmPw) => {
    const result = await this.companyRepository.checkCompanyIdDup(companyName);
    if (result) {
      throw new Error("이미 가입된 계정입니다.");
    }
    const hashedPw = bcrypt.hashSync(password, 10);
    await this.companyRepository.createCompany(
      companyName,
      hashedPw,
      confirmPw
    );
    return;
  };

  checkCompanyIdDup = async (companyName) => {
    const findOneCompany = await this.companyRepository.findOneCompany(
      companyName
    );

    if (findOneCompany) {
      throw new Error("이미 가입된 기업입니다.");
    } else {
      return "사용가능한 계정입니다.";
    }
  };

  createReservation = async (
    companyName,
    companyEmail,
    companyPassword,
    interviewManager
  ) => {
    await this.companyRepository.createReservation(
      companyName,
      companyEmail,
      companyPassword,
      interviewManager
    );
    return;
  };

  loginCompany = async (companyName, password) => {
    const findOneCompany = await this.companyRepository.loginCompany(
      companyName
    );
    if (findOneCompany.expiration === "true") {
      throw new Error("장기간 미접속으로 정지된 회원입니다");
    }
    const match = bcrypt.compare(password, findOneCompany.password);

    if (!match) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
    } else {
      const accessToken = jwt.sign(findOneCompany);
      const refreshToken = jwt.refreshSign(findOneCompany);
      await refreshModel.create({ refreshToken: `Bearer ${refreshToken}` });
      return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      };
    }
  };
}

module.exports = CompanyService;
