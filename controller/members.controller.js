const MembersService = require("../service/members.service");
const Joi = require("joi");

const membersSchema = Joi.object({
  memberEmail:Joi.string().email().required(),
  password:Joi.string().required()
})

class MembersController {
  membersService = new MembersService();
  createMembers = async (req, res, next) => {
    try{
      const { memberEmail,password } = req.body;

    await this.membersService.createMembers(memberEmail, password);

    res.status(201).json({ message: "회원가입 되었습니다." });
    }catch(err){
      res.status(401).json({message:"가입에 실패했습니다."})
    }
    
  };
}
module.exports = MembersController;


