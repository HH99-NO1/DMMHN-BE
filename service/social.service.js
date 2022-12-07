require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const SocialRepository = require("../repository/social.repository");

const GOOGLE_GRANT_TYPE = "authorization_code";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URI;

const KAKAO_GRANT_TYPE = "authorization_code";
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;

class SocialService {
    socialRepository = new SocialRepository();

    isGoogle = async (code)=>{
        const {data} = await axios.post(
            `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URL}&grant_type=${GOOGLE_GRANT_TYPE}`,
            {
                headers: {"content-type": "application/x-www-form-urlencoded"},
            }
        )

        let accessToken = data.accessToken;

        const memberInfo = await axios(
            `https://www.googleapis.com/oauth2/v2/memberinfo?access_token=${accessToken}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ).then((el)=>{
            return el.data;
        });
        return memberInfo.id
    }

    isKakao = async (code)=>{
        const {data} = await axios(
            `https://kauth.kakao.com/oauth/token?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
        {
            headers : {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            }
        }
       )
       let accessToken = data.accessToken;
       //토큰을 카카오쪽으로 보내서 정보 요청 및 받기
        const kakaoMember = await axios("https://kapi.kakao.com/v2/user/me",{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return kakaoMember.data.id
        
    
    }
}




module.exports = SocialService;
