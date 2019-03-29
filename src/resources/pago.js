const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/pagoModel'), './data/pagos.json', ['userID', 'prestamoID','pagoID'],'objectId');


	var c = new Controller(require('../models/pagoModel'), './data/pagos.json', 'pagoID');
	
	app.get('/users/:userID/prestamos/:prestamoID/pagos',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users/:userID/prestamos/:prestamoID/pagos',function(req, res)  {
		c.create(req, res); 
	})
	app.get('/users/:userID/prestamos/:prestamoID/pagos/:pagoID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID/prestamos/:prestamoID/pagos/:pagoID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID/prestamos/:prestamoID/pagos/:pagoID',function(req, res)  {
		c.delete_one(req, res);
	})
   	

};
