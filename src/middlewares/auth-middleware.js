exports.LogginRedirect = (req, res, next) => {
    if( req.session.isLoggedin ){
        return res.redirect("/")
    }

    next()
}

exports.isAuth = (req, res, next) => {
    if( !req.session.isLoggedin ) {
        const error = new Error("Not authorized")
        next(error)
    }

    next()
}