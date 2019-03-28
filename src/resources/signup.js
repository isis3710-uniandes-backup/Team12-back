const Controller = require('../controllers/signupController');

module.exports = function(app) {
	var c = new Controller(require('../models/usuarioModel'), './data/usuarios.json', 'userID');

    // login Routes
    app.route('/signup')
        .post(function(req, res)  {
		    c.signup(req, res);
		});
};
