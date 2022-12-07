const Members = require("../models/members");
const MembersRepository = require("./members.repository");

class SocialRepository {
  createMember = async(memberId, nickName, birth, job, stack)=>{
    const createMember = await Members.create({memberId, nickName, birth, job,stack})
    return createMember
  }
  // id찾기 

  findMemberAccountId = async(memberId)=>{
    const findMemberAccountData = await Members.findOne({
        memberId
    })
    return findMemberAccountData;
  }
//계정 중복확인
  checkDuplicatedId = async(memberId)=>{
    const findMember = await Members.findOne({memberId});
    return findMember
  }
  updateRefresh = async(memberId,refreshToken)=>{
   const updateRefresh = await Members.updateOne(
    {memberId},
    {$set: {refreshToken}}
   )
   return updateRefresh
  }
}


module.exports = SocialRepository;