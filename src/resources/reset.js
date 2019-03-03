const fs = require('fs');

module.exports = function(app) {

    let route = './data/';
    // users Routes
    app.get('/reset/objetos', function(req, res){
      route = route + 'objetos.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/categorias', function(req, res){
      route = route + 'categorias.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/subcategorias', function(req, res){
      route = route + 'subcategorias.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/ciudades', function(req, res){
      route = route + 'ciudades.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/usuarios', function(req, res){
      route = route + 'usuarios.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/pagos', function(req, res){
      route = route + 'pagos.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/prestamos', function(req, res){
      route = route + 'prestamos.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/servicios', function(req, res){
      route = route + 'servicios.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
    app.get('/reset/ofertas', function(req, res){
      route = route + 'ofertas.json';
      fs.writeFile(route, '[]', (err)=>{
        if(err){throw err}
        res.status(200).send('eliminado')
      })
    })
};
