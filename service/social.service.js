// require("dotenv").config();
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const SocialRepository = require("../repository/social.repository");

// const GOOGLE_GRANT_TYPE = "authorization_code";
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URI;

// const KAKAO_GRANT_TYPE = "authorization_code";
// const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
// const KAKAO_REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;

// const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
// const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI;
// const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
// const NAVER_STATE = process.env.NAVER_STATE;

// class SocialService {
//     socialRepository = new SocialRepository();

//     isGoogle = async (code)=>{
//         const {data} = await axios.post(
//             `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URL}&grant_type=${GOOGLE_GRANT_TYPE}`,
//             {
//                 headers: {"content-type": "application/x-www-form-urlencoded"},
//             }
//         )

//         let accessToken = data.accessToken;

//         const memberInfo = await axios(
//             `https://www.googleapis.com/oauth2/v2/memberinfo?access_token=${accessToken}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         ).then((el)=>{
//             return el.data;
//         });
//         return memberInfo.id
//     }

//     isKakao = async (code)=>{
//         const {data} = await axios(
//             `https://kauth.kakao.com/oauth/token?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
//         {
//             headers : {
//                 "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//             }
//         }
//        )
//        let accessToken = data.accessToken;
//        //토큰을 카카오쪽으로 보내서 정보 요청 및 받기
//         const kakaoMember = await axios("https://kapi.kakao.com/v2/user/me",{
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         })
//         return kakaoMember.data.id

//     }
//     isNaver =async (code)=>{
//         const { data } =await axios.get(
//             `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${NAVER_REDIRECT_URI}&code=${code}&state=${NAVER_STATE}`,
//             {
//                 headers:{
//                     "content-type":"application/x-www-form-urlencoded;charset=utf-8",
//                 },
//             }
//         );
//         let accessToken = data.accessToken;

//         const naverMember = await axios("https://openapi.naver.com/v1/nid/me",{
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });
//         return naverMember.data.reponse.id
//     }
//     createMember = async(memberId, nickName, birth, job, stack) => {
//         const isSameNickname = await this.socialRepository.findMemberAccountNick(nickName);

//         //유저 nickname 중복 검사
//         if(isSameNickname){
//             const err = new Error(`MemberService Error`);
//             err.status = 409;
//             err.message = "이미 가입된 닉네임이 존재합니다."
//             throw err;
//         }
        
//         const createMember = await this.socialRepository.createMember(memberId, nickName, birth, job, stack);
//         return createMember
//     }

//     findMembers

// }

// module.exports = SocialService;
