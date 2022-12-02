const members = require("../models/members");
const jwt = require("../jwt/jwt-utils");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = authorization.split(" ");
  if (authType !== "Bearer") {
    res.status(401).send({ errorMessage: "이용할 수 없습니다" });
  }

  const { memberEmail } = jwt.verify(authToken);
  members.findOne({ memberEmail }).then((members) => {
    res.locals.members = members;
    tokenInfo = jwt.verify(authToken);
    next();
  });
};
