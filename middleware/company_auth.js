// const jwt = require("jsonwebtoken");
const company = require("../models/company");
require("dotenv").config();
const jwt = require("../jwt/company-jwt-utils");

// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = authorization.split(" ");

  if (authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "이용할 수 없습니다.",
    });
    return;
  }

  try {
  const { id } = jwt.verify(authToken);
  company.findById(id).then((user) => {

    res.locals.user = user;
    tokenInfo = jwt.verify(authToken);
    next();
  });
  } catch (err) {
  res.status(401).send({
    errorMessage: "로그인 후 이용 가능한 기능입니다.",
  });
  }
};
