const fs = require('fs');
const path = require('path');
const jsonPath = '.'+path.sep+'JSON-Persistence'+path.sep;
var objects =[], categories = [];

//Etapa de lectura de archivos persistentes
try{objects = JSON.parse(fs.readFileSync(jsonPath+'objects.json'))}catch(err){}
try{categories = JSON.parse(fs.readFileSync(jsonPath+'categories.json'))}catch(err){}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//CRUD operations for objects
//----------------------------------------------------------------------------------------------------------------------------------------------------------

function readAllObjects(req,res){
  res.send(JSON.stringify(objects));
}
function readOneObject(req,res){
  let id = req.params.id;
  let respuesta = (id<objects.length)?JSON.stringify(objects[id]):"No existe un objeto con ese ID";
  res.send(respuesta);
}
function addObject(req,res){
  //Llave primaria asignada de forma dinámica
  let data = req.params;
  data.id = objects.length +1;
  let reply;
  let nuevo;
  objects.push(nuevo);
  fs.writeFile(jsonPath+'objects.json', JSON.stringify(objects, null, 2), (err) => {
    if (err){
      throw err;
      reply = {msg: 'Internal server error while writing '}
    }
    else{
      reply = {msg:'Se ha creado un nuevo objeto'}
    };
  });
  res.send(reply);
}
function replaceObject(req,res){}
function deleteObject(req,res){}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//CRUD operations for all categories
//----------------------------------------------------------------------------------------------------------------------------------------------------------

function readAllCategories(req,res){
  res.send(JSON.stringify(categories));
}
function readOneCategory(req,res){
  let id = req.params.id;
  let respuesta = (id<categories)? JSON.stringify(categories[id]):"no hay una categoría con ese identificador";
  res.send(respuesta);
}
function addCategory(req,res){
  //Llave primaria asignada de forma dinámica
  let data = req.params;
  data.id = categories.length +1;
  let reply;
  let nuevo;
  categories.push(nuevo);
  fs.writeFile(jsonPath+'categories.json', JSON.stringify(categories, null, 2), (err) => {
    if (err){
      throw err;
      reply = {msg: 'Internal server error while writing '}
    }
    else{
      reply = {msg:'Se ha creado una nueva categoria'}
    };
  });
  res.send(reply);
}
function replaceCategory(req,res){}
function deleteCategory(req,res){}

//----------------------------------------------------------------------------------------------------------------------------------------------------------
//CRUD operations for all subcategories
//----------------------------------------------------------------------------------------------------------------------------------------------------------

function readAllSubcategories(req,res){
  //res.send(JSON.stringify(objects));
}
function readOneSubcategory(req,res){
  let id = req.params.id;
  //res.send(JSON.stringify(objects[id]))
}
function addSubcategory(req,res){
  //Llave primaria asignada de forma dinámica
  let data = req.params;
  data.id = objects.length +1;
  let reply;
  /**fs.writeFile(jsonPath, JSON.stringify(objects, null, 2), (err) => {
    if (err){
      throw err;
      reply = {msg: 'Internal server error while writing '}
    }
    else{
      reply = {msg:'Se ha creado un nuevo objeto'}
    };
  });**/
  res.send(reply);
}
function replaceSubcategory(req,res){}
function deleteSubcategory(req,res){}




//----------------------------------------------------------------------------------------------------------------------------------------------------------
//Export all modules
//----------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports.addObject = addObject;
module.exports.readAllObjects = readAllObjects;
module.exports.readOneObject = readOneObject;

module.exports.addCategory = addCategory;
module.exports.readAllCategories = readAllCategories;
module.exports.readOneCategory = readOneCategory;

module.exports.addSubcategory = addSubcategory;
module.exports.readAllSubcategories = readAllSubcategories;
module.exports.readOneSubcategory = readOneSubcategory;
