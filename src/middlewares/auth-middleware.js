exports.LogginRedirect = (req, res, next) => {
    if( req.session.isLoggedin ){
        return res.redirect("/")
    }

    next()
}