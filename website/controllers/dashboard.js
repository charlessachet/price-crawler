module.exports = function(app) {
    var User = app.models.user;

    var DashboardController = {
        index: function(req, res) {
            var _id = req.session.user._id;
            User.findById(_id, function(error, user) {
                var products = user.products;
                var result = {user: user
                                , products: products};
                res.render('dashboard/index', result);
            });
        },
        create: function(req, res) {
            var _id = req.session.user._id;
	    var product = req.body.product;
    	    User.findById(_id, function(error, user){
 		var products = user.products;
		if (product.link.toLowerCase().indexOf(product.store_name.toLowerCase()) >= 0){
                    product.current_price = product.first_price
                    product.best_price = product.first_price
                    product.current_variation = 0.00
                    price = {value: product.first_price
                               , date: Date.now()}
                    product.prices = []
                    product.prices.push(price)
                    console.log("New product: " + JSON.stringify(product))
                    products.push(product);
                    user.save(function(){
                        res.redirect('/dashboard');
                    });
		 }else{
		    var result = {user: user
			            , products: products};
		    res.render('dashboard/fill_error', result);
		 }
	    });
        },
        show: function(req, res) {
            var _id = req.session.user._id;
            User.findById(_id, function(error, user){
                var productID = req.params.id;
                var product = user.products.id(productID);
                var outputPrices = product.prices
                console.log("Show products")
                var result = {user: user
                                , product: product
                                , outputPrices: JSON.stringify(outputPrices)};
                res.render('dashboard/show', result);
            });
        },
        edit: function(req, res) {
            var _id = req.session.user._id;
            User.findById(_id, function(error, user){
                var productID = req.params.id;
                var product = user.products.id(productID);
                var result = {user: user
                                , product: product};
		console.log("Edit product: " + product)
                res.render('dashboard/edit', result);
            });
        },
        update: function(req, res) {
            var _id = req.session.user._id;
            User.findById(_id, function(error, user){
		if (req.body.product.link.toLowerCase().indexOf(req.body.product.store_name.toLowerCase()) >= 0){
                    var productID = req.params.id;
                    var product = user.products.id(productID);
                    product.name = req.body.product.name;
                    product.store_name = req.body.product.store_name;
                    product.link = req.body.product.link;
	            console.log("Update product: " + product)
                    user.save(function(){
                        res.redirect('/dashboard');
                    });
                }else{
		    var result = {user: user
			            , products: user.products};
		    res.render('dashboard/fill_error', result);
		}
	    });
        },
        destroy: function(req, res) {
            var _id = req.session.user._id;
            User.findById(_id, function(error, user){
                var productID = req.params.id;
		console.log("Delete product: " + productID)
                User.findById(_id, function(error, user){
                    user.products.id(productID).remove();
                    user.save(function(){
                        res.redirect('/dashboard');
                    });
                });
            });
        }
    };
    return DashboardController;
};
