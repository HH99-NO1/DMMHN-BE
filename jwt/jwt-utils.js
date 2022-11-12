const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const refreshModel = requrie("../models/refresh.models");
module.exports = {
  sign: (findOneUser) => {
    const payload = { id: findOneUser._id };
    return jwt.sign(payload, secretKey, {
      expiresIn: "30s",
    });
  },

  verify: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log("jwt.utils.js 14: ", decoded);
      return { ok: true, id };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },

  refreshSign: () => {
    return jwt.sign({}, secretKey, {
      expiresIn: "50s",
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
