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
const reset = require('./resources/reset.js');
const login = require('./resources/login.js');
//app initialization
const app = express();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.options('*', cors())*/
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


users(app);
ciudades(app);
servicios(app);
objetos(app);
categorias(app);
subcategorias(app);
pagos(app);
prestamos(app);
ofertas(app);
reset(app);
login(app);
//app.use('/objetos', objetos)

let port = process.env.PORT || 3001;

app.listen(port, () => {console.log('Server is up and running on port number ' + port);});
