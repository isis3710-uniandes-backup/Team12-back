const Controller = require('../controllers/loginController');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

module.exports = function(app) {
	var c = new Controller('./data/usuarios.json');

    // login Routes
    app.route('/login')
        .post(function(req, res)  {
		    c.login(req, res);
		});
};
