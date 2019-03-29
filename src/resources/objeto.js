const SubController = require('../controllers/subresourcesController');
const Controller = require('../controllers/resourcesController');
const fs = require('fs');

module.exports = function(app) {
	var c = new SubController(require('../models/objetoModel'), './data/objetos.json', ['userID', 'objectID'], 'seller_id');
	var c = new Controller(require('../models/objetoModel'), './data/objetos.json', 'objectID');

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
	app.get('/objetos',function(req, res)  {
		c.list_all(req, res);
	});
    app.get('/objetos/category/:categoryID',function(req, res)  {
		fs.readFile('./data/objetos.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = []
			data = JSON.parse(data)
			for (const obj of data) {
			
				console.log(obj)
				if (obj.category_id === req.params.categoryID){
					respuesta.push(obj)
				}
			}
			
            res.status(200).json(respuesta);
        });
	});
    
};
