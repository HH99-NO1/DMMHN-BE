const { sign, verify, refreshVerify } = require("./jwt-utils");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const RefreshModel = require("../models/refresh");
const refresh = async (req, res) => {
  // access token과 refresh token의 존재 유무를 체크
  if (req.headers.authorization && req.headers.refresh) {
    const accessToken = req.headers.authorization.split(" ")[1];
    const refreshToken = req.headers.refresh;
    const findOneRefreshToken = await RefreshModel.findOne({ refreshToken });
    // access token의 유효성을 체크 -> expired이어야 한다
    const accessTokenResult = verify(accessToken);
    console.log("accessTokenResult: ", accessTokenResult);

    if (!findOneRefreshToken) {
      res.status(400).send({ message: "유효하지 않은 refresh token 입니다" });
    }
    // access token을 디코딩하여 user의 정보를 가져온다
    // const decoded = jwt.decode(accessToken);
    // 디코딩 결과가 없으면 권한이 없음을 응답
    // if (decoded === null) {
    //   res.status(401).send({
    //     ok: 1,
    //     message: "권한이 없습니다",
    //   });
    // }
    // refresh token이 유효한지를 검사한다
    try {
      const refreshResult = await refreshVerify(refreshToken);

      // access token의 재발급을 위해서는 access token이 만료되어 있어야 한다*/
      if (accessTokenResult.message === "jwt expired") {
        // refresh token이 만료되었다면 새로 로그인을 해야 한다
        if (refreshResult.message === "refreshToken expired") {
          res.status(401).send({
            ok: 2,
            message: "새로 로그인을 해주세요!",
          });
          // refresh token이 유효하다면 access token을 재발급한다
        } else {
          const payload = { id: decoded.id, email: decoded.email };
          const newAccessToken = jwt.sign(payload, secretKey, {
            expiresIn: "30s",
          });
          res.status(200).send({
            ok: 5,
            data: {
              accessToken: `Bearer ${newAccessToken}`,
            },
          });
        }
      } else {
        res.status(400).send({
          ok: 3,
          message: "액세스 토큰이 만료되지 않았습니다",
        });
      }
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  } else {
    res.status(400).send({
      ok: 4,
      message: "액세스 토큰 또는 리프레시 토큰이 존재하지 않습니다.",
    });
  }
};

module.exports = refresh;
