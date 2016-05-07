module.exports = function(app) {
    var User = app.models.user;

    var HomeController = {
        index: function(req, res) {
	    console.log("Page accessed!")
            res.render('home/index');
        },
        login: function(req, res){
            var username = req.body.user.username
                , password = req.body.user.password
            var query = {username: username};
            User.findOne(query)
                .select('username password')
                .exec(function(error, user){
                if(user != null){
		    if(user.password == password){
                        req.session.user = user;
			console.log("Login succeeded")
                        res.redirect('/dashboard');
                    } else {
			console.log("Login error")
                        res.render('home/login_error');
                    }
		} else {
		    console.log("Login error")
		    res.render('home/login_error');
		}
            });
        },
        logout: function(req, res) {
            req.session.destroy();
	    console.log("Logout")
            res.redirect('/');
        }
    };
    return HomeController;
};
