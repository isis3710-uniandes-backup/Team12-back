const Controller = require('../controllers/subresourcesController');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
	secret: 'keyboard cat 4 ever'
});

module.exports = function (app) {
	var c = new Controller(require('../models/ofertaModel'), './data/ofertas.json', ['userID', 'ofertaID'], 'userId ');

	app.get('/users/:userID/ofertas', function (req, res) {
		c.list_all(req, res);
	})
	app.post('/users/:userID/ofertas', function (req, res) {
		c.create(req, res);
	})
	app.get('/users/:userID/ofertas/:ofertaID', function (req, res) {
		c.read_one(req, res);
	})
	app.put('/users/:userID/ofertas/:ofertaID', function (req, res) {
		c.update_one(req, res);
	})
	app.delete('/users/:userID/ofertas/:ofertaID', function (req, res) {
		c.delete_one(req, res);
	})

};

