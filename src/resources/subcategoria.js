const Controller = require('../controllers/subresourcesController');
const fs = require('fs')

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
 
	app.get('/objetos/category/:categoryID/subcategory/:subcategoryID',function(req, res)  {
		fs.readFile('./data/objetos.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = []
			data = JSON.parse(data)
			for (const obj of data) {
			
				console.log(obj)
				if (obj.subcategory_id === req.params.subcategoryID && obj.category_id === req.params.categoryID){
					respuesta.push(obj)
				}
			}
			
            res.status(200).json(respuesta);
        });
	});

	
	app.get('/objetos-en/subcategory/:subcategoryID',function(req, res)  {
		fs.readFile('./data/objetos-en.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
			}
			let respuesta = []
			data = JSON.parse(data)
			for (const obj of data) {
			
				console.log(obj)
				if (obj.subcategory_id === req.params.subcategoryID){
					respuesta.push(obj)
				}
			}
			
            res.status(200).json(respuesta);
        });
	});

	var ceng = new Controller(require('../models/subcategoriaModel'), './data/subcategorias-en.json', ['categoryID', 'subcategoryID'], 'category_id');

	app.get('/categories-en/:categoryID/subcategorias',function(req, res)  {
		ceng.list_all(req, res);
	})
	app.get('/categories-en/:categoryID/subcategorias/:subcategoryID',function(req, res)  {
		ceng.read_one(req, res);
	})
};
