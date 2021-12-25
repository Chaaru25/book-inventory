const express = require('express')
const BookController = require("../controllers/book-controller")

const router = express.Router()

//GET /auth/addbook
router.get("/add-book", BookController.getAddBook)

//POST /auth/signup
router.post("/add-book", BookController.postAddBook)

module.exports = router