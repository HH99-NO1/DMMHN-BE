const { sign, verify, refreshVerify } = require("./jwt-utils");
const jwt = require("jsonwebtoken");

const refresh = async (req, res) => {
  // access token과 refresh token의 존재 유무를 체크
  if (req.headers.authorization && req.headers.refresh) {
    const accessToken = req.headers.authorization.split(" ")[1];
    const refreshToken = req.headers.refresh;

    // access token의 유효성을 체크 -> expired이어야 한다
    const accessTokenResult = verify(accessToken);

    // access token을 디코딩하여 user의 정보를 가져온다
    const decoded = jwt.decode(accessToken);

    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: "권한이 없습니다",
      });
    }
    // refresh token이 유효한지를 검사한다
    const refreshResult = await refreshVerify(refreshToken);
    console.log(accessTokenResult);
    // access token의 재발급을 위해서는 access token이 만료되어 있어야 한다*/
    if (
      accessTokenResult.ok === false &&
      accessTokenResult.message === "jwt expired"
    ) {
      // refresh token이 만료되었다면 새로 로그인을 해야 한다
      if (refreshResult.message === "refreshToken expired") {
        res.status(401).send({
          ok: false,
          message: "새로 로그인을 해주세요!",
        });
        // refresh token이 유효하다면 access token을 재발급한다
      } else {
        const newAccessToken = sign(decoded);
        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(400).send({
        message: "액세스 토큰이 만료되지 않았습니다",
      });
    }
  } else {
    res.status(400).send({
      ok: false,
      message: "액세스 토큰 또는 리프레시 토큰이 존재하지 않습니다.",
    });
  }
};

module.exports = refresh;
