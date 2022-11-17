const Company = require("../models/company");

class CompanyRepository {
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
    const createCompanyData = await Company.create({
      companyName,
      companyEmail,
      companyAddress,
      registrationNumber,
      companyCEO,
      companyAdmin,
      companyTel,
      companyTag,
      password
    });
    return createCompanyData;
  };

  findOneCompany = async (companyEmail) => {
    const checkCompany = await Company.findOne({ companyEmail });
    return checkCompany;
  };
}

module.exports = CompanyRepository;
