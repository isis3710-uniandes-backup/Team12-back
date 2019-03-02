var express = require('express');
//const app = express();
const persistence = require('../persistence.js');
const router = express.Router();

router.get('/',(req,res)=>{
  persistence.readAllObjects(req,res);
});
router.get('/:id', (req,res)=>{
  persistence.readOneObject(req,res);
});
module.exports = router;
