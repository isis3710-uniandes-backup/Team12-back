const Controller = require('../controllers/subresourcesController');
const {jwtMW}= require('../config');

module.exports = function(app) {
	var c = new Controller(require('../models/prestamoModel'), './data/prestamos.json', ['userID', 'prestamoID'],'objectId');

   	app.route('/users/:userID/prestamos', jwtMW)
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});


    app.route('/users/:userID/prestamos/:prestamoID',jwtMW)
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
