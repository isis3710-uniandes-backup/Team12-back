const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/pagoModel'), './data/pagos.json', 'pagoID');

   	app.route('/objects/:objectID/prestamos/:prestamoID/payments')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});


    app.route('/objects/:objectID/prestamos/:prestamoID/payments/:paymentID')
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
