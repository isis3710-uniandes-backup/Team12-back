const Controller = require('../controllers/resourcesController');

module.exports = function(app) {
	var c = new Controller(require('../models/categoriaModel'), './data/categorias.json', 'categoriaID');
    // users Routes
    app.route('/categories')
        .get((req,res)=>{c.list_all(req,res)})
        .post((req,res)=>{c.create(req,res)});


    app.route('/categories/:categoriaID')
        .get((req,res)=>{c.read_one(req,res)})
        .put((req,res)=>{c.update_one(req,res)})
        .delete((req,res)=>{c.delete_one(req,res)});
};
