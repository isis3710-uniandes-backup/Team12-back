const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/subcategoriaModel'), './data/subcategorias.json', ['categoryID', 'subcategoryID'], 'category_id');

    // services Routes
    app.route('/categories/:categoryID/subcategorias')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});

    app.route('/categories/:categoryID/subcategorias/:subcategoryID')
        .get(function(req, res)  {
		    c.read_one(req, res);
		})
        .put(function(req, res)  {
		    c.update_one(req, res);
		})
        .delete(function(req, res)  {
		    c.delete_one(req, res);
		});
};
