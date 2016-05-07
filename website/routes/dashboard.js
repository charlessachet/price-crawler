module.exports = function(app) {
    var autenticate = require('./../middlewares/autenticator')
        , dashboard = app.controllers.dashboard;
    app.get('/dashboard', autenticate, dashboard.index);
    app.get('/dashboard/fill_error', autenticate, dashboard.index);
    app.get('/product/:id', autenticate, dashboard.show);
    app.post('/product', autenticate, dashboard.create);
    app.get('/product/:id/edit', autenticate, dashboard.edit);
    app.put('/product/:id', autenticate, dashboard.update);
    app.delete('/product/:id', autenticate, dashboard.destroy);
};
