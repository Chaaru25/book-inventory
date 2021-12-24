const express = require("express")
const path  = require("path")
const bodyParser = require("body-parser")

const authRoutes = require("./routes/auth-routes")

const app = express()

app.use("/public", express.static(path.join(__dirname, '..', 'public')))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res, next) => {
    res.send("Hello world")
})

app.use("/auth", authRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started in ${process.env.PORT || 3000}`)
})