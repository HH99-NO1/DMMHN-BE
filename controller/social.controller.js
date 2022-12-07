require("dotenv").config();
const { error } = require("winston");
const SocialService = require("../service/social.service");

// 순서
// 1. 프론트에게 인가코드 받기
// 2. 받은 인가코드를 백이 kakao쪽에 token요청
// 3. token받은 걸로 유저 정보 체크 후 DB에 저장
// 4. DB에 저장 후 token을 다시 만들어서 프론트에게 보내기

class SocialController {
  socialService = new SocialService();

  isGoogle = async (req, res, next) => {
    try {
      //프론트에게 인가코드 받기
      const { code } = req.body;
      console.log("인가코드" + code);
      const isGoogle = await this.socialService.isGoogle(code);

      const findGoogleMember = await this.socialService.findMember(isGoogle);
      if (!findGoogleMember) {
        res.status(200).json({ memberId: isGoogle });
      } else {
        const accessToken = await this.socialService.accessToken(isGoogle);
        const refreshToken = await this.socialService.refreshToken();

        //refreshToken  DB 업데이트
        await this.socialService.updateRefresh(isGoogle, refreshToken);
        res.status(201).json({
          accessToken: `Bearer $(accessToken)`,
          refreshToken: `Bearer ${refreshToken}`,
        });
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        errorMessage: err.message,
        message: "에러가 발생했습니다.",
      });
    }
  };

  google_callback = async (req, res, next) => {
    try {
      //프론트에서 인가코드 받기
      const { memberId, nickName, birth, job, stack } = req.body;
      try {
        await this.socialService.createUser(
          memberId,
          nickName,
          birth,
          job,
          stack
        );
        const accessToken = await this.socialService.accessToken(memberId);
        const refreshToken = await this.socialService.refreshToken();
        await this.socialService.updateRefresh(memberId, refreshToken);

        res.status(201).json({
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message, statusCode: err.status });
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        errorMessage: err.message,
        message: "에러가 발생했습니다.",
      });
    }
  };

  isKakao = async(req,res,next)=>{
    try{
      //프론트 인가코드 받기
      const { code } = req.body;

      console.log("인가 코드" + code);
      try{
        const isKaKao = await this.socialService.isKakao(code);
        const findKakaoMember = await this.socialService.findKakaoMember(
          isKaKao
        )
        if (!findKakaoMember) {
          res.status(200).json({memberId: isKakao})
        }else{
          const accessToken = await this.socialService.accessToken(isKaKao);
          const refreshToken = await this.socialService.refreshToken();

          //refreshToken db에 업데이트
          await this.socialService.updateRefresh(isKakao, refreshToken);
          res.status(201).json({
            accessToken :`Bearer ${accessToken}`,
            refreshToken:`Bearer ${refreshToken}`,
          })
        }
      }catch(error){
        console.log(error);
        res.send(error)
      }
      
    }catch(err){
      res.status(400).send({
        success: false,
        errorMessage :err.message,
        message:"에러가 발생했습니다.",
      })
    }
  }

  kakao_callback = async(req,res,next)=>{
    try{
      //프론트에게 인가코드 받기
      const { memberId, nickName, birth, job, stack } =req.body;
      console.log(nickName)
      try{
        await this.socialService.createMembers(
          memberId, 
          nickName,
          birth,
          job,
          stack 
        )
        const accessToken = await this.socialService.accessToken(memberId)
        const refreshToken = await this.socialService.refreshToken();
        await this.socialService.updateRefresh(memberId,refreshToken);
        res.status(201).json({
          accessToken : `Bearer ${accessToken}`,
          refreshToken : `Bearer ${refreshToken}`,
        });        
      }catch(error){
        console.log(error)
        res.status(400).json({message: error.message, statusCode: error.status})
      }  
    }catch(err){
      res.status(400).send({
        success:false,
        errorMessage: err.message,
        message: "에러가 발생했습니다."
      })
    }
  }
  

}

module.exports = SocialController;
