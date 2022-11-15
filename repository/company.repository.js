const Company = require("../models/company")

class CompanyRepository {

    createCompany = async (companyName,password,confirmPw)=>{
        const createCompanyData = await Company.create({
            companyName,
            password,
            confirmPw
        })
        return createCompanyData
    }

    checkCompanyIdDup = async (companyName)=>{
        const checkCompany = await Company.findOne({ companyName });
        return checkCompany;
    };

    findOneCompany = async (_id) => {
        const findOneCompamy = await Members.findById(_id);
        return findOneCompamy;
      };
    
}

module.exports = CompanyRepository;