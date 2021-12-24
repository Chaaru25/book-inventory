const express = require("express")

const AuthController = require("../controllers/auth-controller")

const router = express.Router();

//GET /auth/login
router.get("/login", AuthController.getLogin)

//POST /auth/login
router.post("/login", AuthController.postLogin)

//GET /auth/signup
router.get("/signup", AuthController.getSignup)

//POST /auth/signup
router.post("/signup", AuthController.postSignup)


//POST /auth/logout
router.post("/logout", AuthController.postLogout)

module.exports = router