const SubController = require('../controllers/subresourcesController');
const Controller = require('../controllers/resourcesController');
const fs = require('fs');

module.exports = function(app) {
	var c1 = new SubController(require('../models/objetoModel'), './data/objetos.json', ['userID', 'objectID'], 'seller_id');
	var c = new Controller(require('../models/objetoModel'), './data/objetos.json', 'objectID');

	app.get('/users/:userID/objetos',function(req, res)  {
		c1.list_all(req, res);
	})
	app.post('/users/:userID/objetos',function(req, res)  {
		c1.create(req, res);

	})
	app.get('/users/:userID/objetos/:objectID',function(req, res)  {
		c1.read_one(req, res);
	})
	app.put('/users/:userID/objetos/:objectID',function(req, res)  {
		c1.update_one(req, res);
	})
	app.delete('/users/:userID/objetos/:objectID',function(req, res)  {
		c1.delete_one(req, res);
	})
	app.get('/objetos',function(req, res)  {
		c.list_all(req, res);
	});
	app.get('/objetos/:objID',function(req, res)  {
		fs.readFile('./data/objetos.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = null
			data = JSON.parse(data)
			for (const obj of data) {
			
				console.log(obj)
				if (obj.id === req.params.objID){
					respuesta=obj
					break;
				}
			}
            res.status(200).json(respuesta);
		});
		
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

	app.get('/objetos-en',function(req, res)  {
		fs.readFile('./data/objetos-en.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = []
			data = JSON.parse(data)
			for (const obj of data) {
				respuesta.push(obj)
			}
			
            res.status(200).json(respuesta);
        });
	});
	app.get('/objetos-en/:objID',function(req, res)  {
		fs.readFile('./data/objetos-en.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = null
			data = JSON.parse(data)
			for (const obj of data) {
			
				console.log(obj)
				if (obj.id === req.params.objID){
					respuesta=obj
					break;
				}
			}
            res.status(200).json(respuesta);
        });
	});
    app.get('/objetos-en/category/:categoryID',function(req, res)  {
		fs.readFile('./data/objetos-en.json', 'utf8', (err, data) => {
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
