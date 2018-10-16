module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('error', 'Not Autherized');
        res.redirect('/users/login');
    },
    ensureNotAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');  
        } else {
            return next();
        }
    },
}