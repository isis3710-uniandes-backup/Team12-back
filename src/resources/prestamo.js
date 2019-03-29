const Controller = require('../controllers/subresourcesController');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});

module.exports = function(app) {
	var c = new Controller(require('../models/prestamoModel'), './data/prestamos.json', ['userID', 'prestamoID'],'objectId');

	app.get('/users/:userID/prestamos',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users/:userID/prestamos',function(req, res)  {
		c.create(req, res);
	})
	app.post('/users/:userID/prestamos',function(req, res)  {
		c.list_all(req, res);
	})
	app.get('/users/:userID/prestamos/:prestamoID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID/prestamos/:prestamoID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID/prestamos/:prestamoID',function(req, res)  {
		c.delete_one(req, res);
	})
   	
};
