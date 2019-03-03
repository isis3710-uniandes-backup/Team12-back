//node packages
const express = require('express');
const bodyParser = require('body-parser');
//project resources
const categorias = require('./resources/categoria.js');
const ciudades = require('./resources/ciudad.js');
const objetos = require('./resources/objeto.js');
const ofertas = require('./resources/oferta.js');
const pagos = require('./resources/pago.js');
const prestamos = require('./resources/prestamo.js');
const servicios = require('./resources/servicio.js');
const subcategorias = require('./resources/subcategoria.js');
const users = require('./resources/usuario.js');
//app initialization
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

users(app);

app.use('/objetos', objetos);
app.use('/categorias', categorias);
/**app.use('/subcategorias', subcategorias);
app.use('/pagos', pagos);
app.use('/prestamos', prestamos);
app.use('/usuarios', usuarios);
app.use('/servicios', servicios);
app.use('/ofertas', ofertas);
app.use('/ciudades', ciudades);**/

let port = process.env.PORT || 3000;

app.listen(port, () => {console.log('Server is up and running on port number ' + port);});
