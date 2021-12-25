const express = require("express")

const AuthController = require("../controllers/auth-controller")
const AuthMiddlware = require("../middlewares/auth-middleware")

const router = express.Router();

//GET /auth/login
router.get("/login", AuthMiddlware.LogginRedirect, AuthController.getLogin)

//POST /auth/login
router.post("/login", AuthMiddlware.LogginRedirect, AuthController.postLogin)

//GET /auth/signup
router.get("/signup", AuthMiddlware.LogginRedirect, AuthController.getSignup)

//POST /auth/signup
router.post("/signup", AuthMiddlware.LogginRedirect, AuthController.postSignup)


//POST /auth/logout
router.post("/logout", AuthController.postLogout)

module.exports = router;