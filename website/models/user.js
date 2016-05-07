module.exports = function(app) {
    var Schema = require('mongoose').Schema;

    var price = Schema ({
        value: Number
        , date: { type: Date, default: Date.now() }
    });
    var product = Schema({
        name: String
        , link: String
        , store_name: String
        , first_price: Number
        , current_price: Number
        , best_price: Number
        , current_variation: Number
        , prices: [price]
    });
    var user = Schema({
        username: {type: String, required: true}
        , password: {type: String, required: true
                        , index: {unique: true}}
        , products: [product]
    });

    return db.model('users', user)
}
