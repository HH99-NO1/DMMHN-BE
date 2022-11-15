const express = require("express");
const router = express.Router();
const company = require("../models/company");
const jwt = require("jsonwebtoken");

const refresh = require("../jwt/refreshToken");
const authMiddleware = require("../middleware/auth_middleware");
const MembersController = require("../controller/members.controller");
const membersController = new MembersController();

router.post("/signup", membersController.createMembers);
router.get("/login", membersController.loginMembers);
router.get("/me", authMiddleware, membersController.findOneMember);
router.get("/refresh", refresh, (req, res) => {});
router.put("/", authMiddleware, membersController.updateMember);
router.delete("/", authMiddleware, membersController.deleteMember);

router.post("/companySignup", async (req, res) => {
    const { companyName, companyEmail, companyPassword, interviewManager } = req.body;
    await company.create({ companyName, companyEmail, companyPassword, interviewManager });
    res.status(201).json({ messaage: "회원가입" });
  });

  router.post("/companyLogin", async (req, res) => {
    const { companyName ,companyEmail, companyPassword, interviewManager } = req.body;
  
    try {
      const findCompany = await company.findOne({ interviewManager });
      console.log("######user", findCompany);
  
      if (!findCompany || companyPassword != findCompany.companyPassword) {
        res
          .status(400)
          .json({ errorMessage: "아이디 또는 패스워드를 확인해주세요." });
        return;
      }
      const token = jwt.sign(
        { id: findCompany._id, 
          interviewManager: findCompany.interviewManager,
          companyName: findCompany.companyName
        },
        process.env.SECRET_KEY
      );
      console.log("######", token);
      res.send({
        token: `Bearer ${token}`,
        _id: findCompany._id,
        interviewManager: findCompany.interviewManager,
        companyName: findCompany.companyName // 있어도 그만 없어도 그만 일단 확인
      });
    } catch (err) {
      res.send(err.messaage);
    }
  });

module.exports = router;
