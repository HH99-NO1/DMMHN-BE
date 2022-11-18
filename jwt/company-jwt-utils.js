const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const refreshModel = require("../models/refresh");

module.exports = {
  sign: (findCompany) => {
    const payload = { id: findCompany._id, companyAdmin: findCompany.companyAdmin, companyName: findCompany.companyName };
    return jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });
  },

  verify: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return { ok: true, id: decoded.id };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },

  refreshSign: () => {
    return jwt.sign({}, secretKey, {
      expiresIn: "10h",
    });
  },

  refreshVerify: async (refreshToken) => {
    const data = await refreshModel.findOne({ refreshToken });
    const refreshTokenArray = refreshToken.split(" ");
    const refreshTokenValue = refreshTokenArray[1];

    if (refreshToken === data.refreshToken) {
      try {
        jwt.verify(refreshTokenValue, secretKey);
        return true;
      } catch (err) {
        return { message: "refreshToken expired" };
      }
    } else {
      return false;
    }
  },
};