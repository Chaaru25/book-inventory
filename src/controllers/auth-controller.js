exports.getLogin = (req, res, next) => {
    res.render("auth/login")
}

exports.postLogin = (req, res, next) => {
    console.log(req.body)
    res.send("Login")
}

exports.getSignup = (req, res, next) => {
    res.send("signup")
}

exports.postSignup = (req, res, next) => {
    console.log(req.body)
    res.send("signup")
}

exports.postLogout = (req, res, next) => {
    res.send("Logout")
}