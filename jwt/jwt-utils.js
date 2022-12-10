const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const refreshModel = require("../models/refresh");

module.exports = {
  sign: (findOneUser) => {
    const payload = {
      memberEmail: findOneUser.memberEmail,
      memberName: findOneUser.memberName,
      img: findOneUser.img,
    };
    return jwt.sign(payload, secretKey, {
      expiresIn: "3h",
    });
  },

  verify: (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return { ok: true, memberEmail: decoded.memberEmail };
    } catch (err) {
      return {
        ok: 6,
        message: err.message,
      };
    }
  },

  refreshSign: () => {
    return jwt.sign({}, secretKey, {
      expiresIn: "12h",
    });
  },

  refreshVerify: async (refreshToken) => {
    const data = await refreshModel.findOne({ refreshToken });
    const refreshTokenArray = refreshToken.split(" ");
    const refreshTokenValue = refreshTokenArray[1];
    if (!data) {
      throw new Error("존재하지 않는 refreshToken 입니다");
    }
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
