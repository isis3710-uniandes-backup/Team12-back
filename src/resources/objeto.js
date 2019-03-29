const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/objetoModel'), './data/objetos.json', ['userID', 'objectID'], 'seller_id');

	app.get('/users/:userID/objetos',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/users/:userID/objetos',function(req, res)  {
		c.create(req, res);
	})
	app.get('/users/:userID/objetos/:objectID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/users/:userID/objetos/:objectID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/users/:userID/objetos/:objectID',function(req, res)  {
		c.delete_one(req, res);
	})
    
};
