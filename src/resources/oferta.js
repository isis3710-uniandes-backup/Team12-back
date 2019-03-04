const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/ofertaModel'), './data/ofertas.json', ['userID', 'ofertaID'], 'userId');

    app.route('/users/:userID/ofertas')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});

    app.route('/users/:userID/ofertas/:ofertaID')
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

 