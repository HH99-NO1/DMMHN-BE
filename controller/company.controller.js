const CompanyService = require("../service/company.service");
const Joi = require("joi");
const reservation = require("../models/reservation");
const companySchema = Joi.object({
  companyName: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
  companyAddress: Joi.string().required(),
  registrationNumber: Joi.string().required(),
  companyCEO: Joi.string().required(),
  companyAdmin: Joi.string().required(),
  companyTel: Joi.string().required(),
  companyTag: Joi.string().required(),
  password: Joi.string().required(),
  confirmPw: Joi.string().required()
});

class CompanyController {
  companyService = new CompanyService();

  createCompany = async (req, res, next) => {
    const {
      companyName,
      companyEmail,
      companyAddress,
      registrationNumber,
      companyCEO,
      companyAdmin,
      companyTel,
      companyTag,
      password,
      confirmPw,
    } = req.body;

    //try{
    await companySchema.validateAsync(req.body);
    // if (req.headers.authorization) {
    //   res.status(401).json({ errorMessage: "이미 로그인 된 기업입니다." });
    //   return;
    // }

    if (password !== confirmPw) {
      res.status(401).json({
        errorMessage: "비밀번호가 비밀번호 확인란과 일치하지 않습니다.",
      });
      return;
    }

    await this.companyService.createCompany(
      companyName,
      companyEmail,
      companyAddress,
      registrationNumber,
      companyCEO,
      companyAdmin,
      companyTel,
      companyTag,
      password
    );
    res.status(201).json({ message: "회원가입에 성공했습니다" });
    // }catch(err){
    //     res.json(err.message);
    // }
  };
}

module.exports = CompanyController;
