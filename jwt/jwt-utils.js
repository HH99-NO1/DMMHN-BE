const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const refreshModel = require("../models/refresh");

module.exports = {
  sign: (findOneUser) => {
    const payload = { id: findOneUser._id, email: findOneUser.memberEmail };
    return jwt.sign(payload, secretKey, {
      expiresIn: "30s",
    });
  },

  verify: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return { ok: true, id: decoded.id };
    } catch (err) {
      return {
        ok: 6,
        message: err.message,
      };
    }
  },

  refreshSign: () => {
    return jwt.sign({}, secretKey, {
      expiresIn: "40s",
    });
  },

  refreshVerify: async (refreshToken) => {
    const data = await refreshModel.findOne({ refreshToken });
    const refreshTokenArray = refreshToken.split(" ");
    const refreshTokenValue = refreshTokenArray[1];
    console.log(data);
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
