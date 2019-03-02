const express = require('express');
const categorias = require('./resources/categoria.js');
const ciudades = require('./resources/ciudad.js');
const objetos = require('./resources/objeto.js');
const ofertas = require('./resources/oferta.js');
const pagos = require('./resources/pago.js');
const prestamos = require('./resources/prestamo.js');
const servicios = require('./resources/servicio.js');
const subcategorias = require('./resources/subcategoria.js');
const usuarios = require('./resources/usuario.js');

const app = express();

app.use('/objetos', objetos);
