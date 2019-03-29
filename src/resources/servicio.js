const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/servicioModel'), './data/servicios.json', ['userID', 'serviceID'], 'seller_id');

	app.get('/users/:userID/services',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users/:userID/services',function(req, res)  {
		c.create(req, res);
	})
	app.get('/users/:userID/services/:serviceID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID/services/:serviceID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID/services/:serviceID',function(req, res)  {
		c.delete_one(req, res);
	})
    // services Routes
	
};
