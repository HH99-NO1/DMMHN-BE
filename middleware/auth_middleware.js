const members = require("../models/members");
const jwt = require("../jwt/jwt-utils");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = authorization.split(" ");
  if (authType !== "Bearer") {
    res.status(401).send({ errorMessage: "이용할 수 없습니다" });
  }

  //   try {
  const { id } = jwt.verify(authToken);
  console.log(jwt.verify(authToken));
  members.findById(id).then((members) => {
    res.locals.members = members;
    next();
  });
  //   } catch (err) {
  //     res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다" });
  //   }
};
