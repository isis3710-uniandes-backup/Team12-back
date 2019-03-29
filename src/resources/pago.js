const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/pagoModel'), './data/pagos.json', 'pagoID');
	
	app.get('/pagos',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/pagos',function(req, res)  {
		c.create(req, res); 
	})
	app.get('/pagos/:pagoID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/pagos/:pagoID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/pagos/:pagoID',function(req, res)  {
		c.delete_one(req, res);
	})
   	
};
