const Controller = require('../controllers/resourcesController');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

module.exports = function(app) {
	var c = new Controller(require('../models/ciudadModel'), './data/ciudades.json', 'cityID');
    // cities Routes
   	app.route('/cities')
        .get(function(req, res)  {
		    c.list_all(req, res);
		})
        .post(function(req, res)  {
		    c.create(req, res);
		});


    app.route('/cities/:cityID')
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
