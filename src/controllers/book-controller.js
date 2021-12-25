exports.getAddBook = (req, res, next) => {
    res.render("book/add_book")
    
}

exports.postAddBook = (req, res, next) => {
    console.log(req.body)
    res.send("Book is added")
}