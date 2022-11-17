const CompanyRepository = require("../repository/company.repository");
const bcrypt = require("bcrypt");

class CompanyService {
  companyRepository = new CompanyRepository();

  createCompany = async (
    companyName,
    companyEmail,
    companyAddress,
    registrationNumber,
    companyCEO,
    companyAdmin,
    companyTel,
    companyTag,
    password
  ) => {
    const result = await this.companyRepository.findOneCompany(companyEmail);


    if (result) {
      throw new Error("이미 가입된 계정입니다.");
    }
    const hashedPw = bcrypt.hashSync(password, 10);
    
    await this.companyRepository.createCompany(
      companyName,
      companyEmail,
      companyAddress,
      registrationNumber,
      companyCEO,
      companyAdmin,
      companyTel,
      companyTag,
      hashedPw
    );
    return;
  };

  checkCompanyIdDup = async (companyEmail) => {
    const findOneCompany = await this.companyRepository.findOneCompany(
        companyEmail
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

}

module.exports = CompanyService;

