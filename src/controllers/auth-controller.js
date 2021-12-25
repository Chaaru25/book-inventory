const bcrypt = require("bcryptjs")
const User = require("../models/user")


exports.getLogin = (req, res, next) => {
    res.render("auth/login")
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loggedinUser;

    User.findOne({ email: email }).then((user) => {
        if( !user ){
            const error = new Error("Email address not registered!")
            return next(error)
        }

        loggedinUser = user
        return bcrypt.compare(password, user.password)
    }).then(isValid => {

        if( !isValid ){
            const error = new Error("Incorrect password")
            return next(error)
        }

        req.session.user = loggedinUser
        req.session.isLoggedin = true

        res.redirect("/")
    }).catch(err=>next(err))
}

exports.getSignup = (req, res, next) => {
    res.render("auth/signup")
}

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((userExists) => {
        if( userExists ){
            const error = new Error("User already exists!")
            return next(error)
            // return res.redirect("/auth/signup")
        }

        return bcrypt.hash(password, 12)
        
    }).then(encPassword => {
        const user = new User({
            name: name,
            email: email,
            password: encPassword
        })

        return user.save()
    }).then(user=> {
        res.redirect("/auth/login")
    }).catch(err=>next(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy()
    res.redirect("/");
}
