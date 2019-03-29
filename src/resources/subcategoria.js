const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/subcategoriaModel'), './data/subcategorias.json', ['categoryID', 'subcategoryID'], 'category_id');

	app.get('/categories/:categoryID/subcategorias',function(req, res)  {
		c.list_all(req, res);
	})
	app.post('/categories/:categoryID/subcategorias',function(req, res)  {
		c.create(req, res);
	})

	app.get('/categories/:categoryID/subcategorias/:subcategoryID',function(req, res)  {
		c.read_one(req, res);
	})
	app.put('/categories/:categoryID/subcategorias/:subcategoryID',function(req, res)  {
		c.update_one(req, res);
	})
	app.delete('/categories/:categoryID/subcategorias/:subcategoryID',function(req, res)  {
		c.delete_one(req, res);
	})
    // services Routes
 
};
