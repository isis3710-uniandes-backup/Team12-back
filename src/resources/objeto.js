var express = require('express');

const router = express.Router();
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('objetos home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About objetos');
});

module.exports = router;
