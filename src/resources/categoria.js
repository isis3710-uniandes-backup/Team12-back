//Acá va el CRUD
var express = require('express');
//const app = express();
const persistence = require('../persistence.js');
const router = express.Router();

router.get('/',(req,res)=>{
  persistence.readAllCategories(req,res);
});
router.get('/:id', (req,res)=>{
  persistence.readOneCategory(req,res);
});
module.exports = router;
