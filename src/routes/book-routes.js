const express = require('express')
const BookController = require("../controllers/book-controller")
const AuthMiddleware = require("../middlewares/auth-middleware")

const router = express.Router()

// GET /book
router.get("/", BookController.getBooks)

//GET /book/addbook
router.get("/add-book", AuthMiddleware.isAuth, BookController.getAddBook)

//POST /book/signup
router.post("/add-book", AuthMiddleware.isAuth, BookController.postAddBook)

//GET /book/edit book
router.get("/edit-book/:id", AuthMiddleware.isAuth, BookController.getEditBook)

//POST /book/update-book
router.post("/update-book", AuthMiddleware.isAuth, BookController.postUpdateBook)

//POST /book/delete
router.post("/delete", AuthMiddleware.isAuth, BookController.postDeleteBook)

module.exports = router