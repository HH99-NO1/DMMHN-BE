const CompanyService = require("../service/company.service");
const Joi = require("joi");
const reservation = require("../models/reservation");
const companySchema = Joi.object({
  companyName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPw: Joi.string().required(),
});

class CompanyController {
  companyService = new CompanyService();

  createCompany = async (req, res, next) => {
    const { companyName, password, confirmPw } = req.body;
    //try{
    await this.companyService.createCompany(companyName, password, confirmPw);
    await companySchema.validateAsync(req.body);
    if (req.headers.authorization) {
      res.status(401).json({ errorMessage: "이미 로그인 된 기업입니다." });
      return;
    }
    if (password !== confirmPw) {
      res.status(401).json({
        errorMessage: "비밀번호가 비밀번호 확인란과 일치하지 않습니다.",
      });
      return;
    }
    res.status(201).json({ message: "회원가입에 성공했습니다" });
  };
}

module.exports = CompanyController;
