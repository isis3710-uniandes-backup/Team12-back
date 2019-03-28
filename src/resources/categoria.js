const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/categoriaModel'), './data/categorias.json', 'categoriaID');
    // users Routes
    app.route('/categories')
        .get((req,res)=>{
            fs.readFile('./data/categorias.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                data = JSON.parse(data);
                var categorias={};
                for (const cat in data) {
                    categorias[cat.id] = cat;
                    categorias[cat.id].subcategories = [];
                }
                fs.readFile('./data/subcategorias.json', 'utf8', (err, subcategories) => {
                    if (err) {
                        throw err;
                    }
                    subcategories = JSON.parse(subcategories)
                    for (const subcat in subcategories) {
                        categorias[subcat.category_id].push(subcat);
                    }    
                    res.status(200).json(categorias.values());
                });
            });
           
        })
        .post((req,res)=>{c.create(req,res)});


    app.route('/categories/:categoriaID')
        .get((req,res)=>{

            fs.readFile('./data/categorias.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                data = JSON.parse(data);
                var resource = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == req.params[this.resourceID]) {
                        resource = data[i];
                        break;
                    }
                }
                if (resource) {
                    resource.subcategories = [];
                    fs.readFile('./data/subcategorias.json', 'utf8', (err, subcat) => {
                        if (err) {
                            throw err;
                        }
                        subcat = JSON.parse(subcat)
                        for (const s in subcat) {
                            categorias[subcat.category_id].push(s);
                        }    
                        res.status(200).json(categorias.values());
                    });
                } else {
                    res.status(404).send('No se encuentra el recurso especificado');
                }
            });

            fs.readFile('./data/categorias.json', 'utf8', (err, data) => {
                
                data = JSON.parse(data);
                var categorias={};
                for (const cat in data) {
                    categorias[cat.id] = cat;
                    categorias[cat.id].subcategories = [];
                }
                fs.readFile('./data/subcategorias.json', 'utf8', (err, subcategories) => {
                    if (err) {
                        throw err;
                    }
                    subcategories = JSON.parse(subcategories)
                    for (const subcat in subcategories) {
                        categorias[subcat.category_id].push(subcat);
                    }    
                    res.status(200).json(categorias.values());
                });
            });
        })
        .put((req,res)=>{c.update_one(req,res)})
        .delete((req,res)=>{c.delete_one(req,res)});
};
