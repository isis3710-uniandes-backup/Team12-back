const Controller = require('../controllers/subresourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/pagoModel'), './data/pagos.json', ['userID', 'prestamoID','pagoID'],'objectId');
    
   	app.route('/users/:userID/prestamos/:prestamoID/pagos')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res); 
		});


    app.route('/users/:userID/prestamos/:prestamoID/pagos/:pagoID')
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
