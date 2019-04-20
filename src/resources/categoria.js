const Controller = require('../controllers/resourcesController');
const fs = require('fs')

module.exports = function(app) {
	var c = new Controller(require('../models/categoriaModel'), './data/categorias.json', 'categoriaID');
    // users Routes
    app.get('/categories',(req,res)=>{
        fs.readFile('./data/categorias.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            data = JSON.parse(data);
            var categorias={};
            for (const cat of data) {
                categorias[cat.id] = cat;
                categorias[cat.id].subcategories = [];
            }
            fs.readFile('./data/subcategorias.json', 'utf8', (err, subcategories) => {
                if (err) {
                    throw err;
                }
                subcategories = JSON.parse(subcategories)
                for (const subcat of subcategories) {
                    categorias[subcat.category_id].subcategories.push(subcat);
                }
                res.status(200).json(Object.keys(categorias).map(k => categorias[k]));
            });
        });
    })
    app.post('/categories',(req,res)=>{c.create(req,res)})

    app.get('/categories/:categoriaID',(req,res)=>{

        fs.readFile('./data/categorias.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            data = JSON.parse(data);
            var resource = null;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == req.params["categoriaID"]) {
                    resource = data[i];
                    break;
                }
            }
            console.log(resource)
            if (resource) {
                resource.subcategories = [];
                fs.readFile('./data/subcategorias.json', 'utf8', (err, subcat) => {
                    if (err) {
                        throw err;
                    }
                    subcat = JSON.parse(subcat)
                    for (const s in subcat) {
                        resource.subcategories.push(s);
                    }    
                    res.status(200).json(resource);
                });
            } else {
                res.status(404).send('No se encuentra el recurso especificado');
            }
        });

    })
    app.put('/categories/:categoriaID',(req,res)=>{c.update_one(req,res)})
    app.delete('/categories/:categoriaID',(req,res)=>{c.delete_one(req,res)})
    // users Routes


    app.get('/categories-en',(req,res)=>{
        fs.readFile('./data/categorias-en.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            data = JSON.parse(data);
            var categorias={};
            for (const cat of data) {
                categorias[cat.id] = cat;
                categorias[cat.id].subcategories = [];
            }
            fs.readFile('./data/subcategorias-en.json', 'utf8', (err, subcategories) => {
                if (err) {
                    throw err;
                }
                subcategories = JSON.parse(subcategories)
                for (const subcat of subcategories) {
                    categorias[subcat.category_id].subcategories.push(subcat);
                }
                res.status(200).json(Object.keys(categorias).map(k => categorias[k]));
            });
        });
    })

    app.get('/categories-en/:categoriaID',(req,res)=>{

        fs.readFile('./data/categorias-en.json', 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            data = JSON.parse(data);
            var resource = null;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == req.params["categoriaID"]) {
                    resource = data[i];
                    break;
                }
            }
            console.log(resource)
            if (resource) {
                resource.subcategories = [];
                fs.readFile('./data/subcategorias-en.json', 'utf8', (err, subcat) => {
                    if (err) {
                        throw err;
                    }
                    subcat = JSON.parse(subcat)
                    for (const s in subcat) {
                        resource.subcategories.push(s);
                    }    
                    res.status(200).json(resource);
                });
            } else {
                res.status(404).send('No se encuentra el recurso especificado');
            }
        });

    })

};
