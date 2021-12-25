require("dotenv").config()
const express = require("express")
const path  = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);

const authRoutes = require("./routes/auth-routes")
const bookRoutes = require("./routes/book-routes")

const app = express()

var store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'session'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

app.use("/public", express.static(path.join(__dirname, '..', 'public')))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'book inventory app',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedin;
    res.locals.user = req.session.user;
    next()
})

app.get("/", (req, res, next) => {
    res.render("index")
})

app.use("/auth", authRoutes)
app.use("/book", bookRoutes)

console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL, (err) => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server started in ${process.env.PORT || 3001}`)
    })
})