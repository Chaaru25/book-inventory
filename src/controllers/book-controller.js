const Book = require("../models/book")

exports.getBooks = (req, res, next) => {
    Book.find().then((books)=>{
        res.render("books/index", {
            books: books
        })
    }).catch(err=>next(err))
}

exports.getAddBook = (req, res, next) => {
    res.render("books/add_book") 
}

exports.postAddBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const stock = req.body.stock;

    const book = new Book({
        title: title,
        author: author,
        imageUrl: imageUrl,
        price: price,
        stock: stock,
        user: req.session.user._id
    })

    book.save().then(book=> {
        res.redirect("/books")
    }).catch(err=>next(err))
}

exports.getEditBook = (req, res, next) => {
    const bookId = req.params.id
    Book.findOne({ _id: bookId }).then(book=>{
        if( !book ){
            const error = new Error("No such a book")
            return next(error)
        }

        res.render("books/edit_book", {
            book: book
        })
    }).catch(err=>next(err))
}


exports.postUpdateBook = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const stock = req.body.stock;
    const bookId = req.body.bookId;

    Book.findOne({ _id: bookId }).then(book=>{
        if( !book ){
            const error = new Error("No Such a book")
            return next(error)
        }

        book.title = title
        book.author = author
        book.imageUrl = imageUrl
        book.price = price
        book.stock = stock
        book.user = req.session.user._id

        return book.save()

    }).then(book=> {
        res.redirect("/books")
    }).catch(err=>next(err))

}

exports.postDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId
    Book.deleteOne({ _id: bookId }).then(()=>{
        res.redirect("/books")
    }).catch(err=>next(err))
}