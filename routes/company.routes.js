const express = require("express");
const router = express.Router();

// const refresh = require("../jwt/refreshToken");
// const authMiddleware = require("../middleware/auth_middleware");
const CompanyController = require("../controller/company.controller");
const companyController = new CompanyController();

router.post("/signup", companyController.createCompany);
router.post("/login", companyController.loginCompany);

module.exports = router;
