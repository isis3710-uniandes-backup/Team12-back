const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/ciudadModel'), './data/ciudades.json', 'cityID');
	// cities Routes
	app.get('/cities',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/cities',function(req, res)  {
		c.create(req, res);
	})
	app.get('/cities/:cityID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/cities/:cityID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/cities/:cityID',function(req, res)  {
		c.delete_one(req, res);
	})
   	

};
