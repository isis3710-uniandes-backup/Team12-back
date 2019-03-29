const fs = require('fs');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');

class resourcesController {
    constructor(pModel, pFile, pResourceID) {
        this.model = pModel;
        this.file = pFile;
        this.resourceID = pResourceID;
    }

    get model() {
        return this._model;
    }

    get file() {
        return this._file;
    }

    get resourceID() {
        return this._resourceID;
    }

    set model(model) {
        this._model = model;
    }

    set file(file) {
        this._file = file;;
    }

    set resourceID(resourceID) {
        this._resourceID = resourceID;
    }

    list_all(req, res) {
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.status(200).json(JSON.parse(data));
        });
    }

    create(req, res) {
        /*
        Teoricamente al tener base de datos, esta nos debería decir si las llaves foraneas del objeto existen
        o no. Sin embargo, es necesario comprobar la existencia del objeto. Por tanto, se plantea una función
        dentro del modelo que verificará la existencia de estas llaves foraneas para cada objeto.
        */
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            req.body.id = uuidv4();
            var resources = JSON.parse(data);
            var resource = false;
            var result = Joi.validate(req.body, this.model.createSchema);
            if (result.error) {
                console.log(result.error);
                res.status(400).send();
                return;
            }
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.body.id) {
                    resource = true;
                    break;
                }
            }
            if (!this.model.fk_on_create(req.body)) {
                res.status(400).send('Problemas con la llave foranea');
            } else if (resource) {
                res.status(400).send('Ya existe un recurso con ese identificador');
            } else {
                resources.push(req.body);
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Se ha creado un nuevo recurso');
                });
            }
        });
    }
    read_one(req, res) {
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            var resource = null;
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourceID]) {
                    resource = resources[i];
                    break;
                }
            }
            if (resource) {
                res.status(200).json(resource);
            } else {
                res.status(404).send('No se encuentra el recurso especificado');
            }
        });
    }


    update_one(req, res) {
        /*
        Teoricamente al tener base de datos, esta nos debería decir si las llaves foraneas del objeto existen
        o no. Sin embargo, es necesario comprobar la existencia del objeto. Por tanto, se plantea una función
        dentro del modelo que verificará la existencia de estas llaves foraneas para cada objeto.
        */
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            var resource = false;
            var result = Joi.validate(req.body, this.model.updateSchema);
            if (result.error) {
                res.status(400).send('Solicitud inadecuada: revisar cuerpo de peticion');
                return;
            }
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourceID]) {
                    var newresource = req.body;
                    for (var key in newresource) {
                        if (newresource[key] !== undefined)
                            resources[i][key] = newresource[key];
                    }
                  resource = true;
                  break;
                }
            }
            if (!this.model.fk_on_update(req.body)) {
                res.status(400).send('Problemas con la fk');
            } else if (resource) {
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send({});
                });
            } else {
                res.status(404).send('No existe el recurso especificado');
            }
        });
    }


    delete_one(req, res) {
        /*
        Teoricamente al tener base de datos, esta nos debería decir si alguna llave foranea que apunte al
        objeto que estamos intentado borrar lo restringe, o debería borrar en cascada todos estos objetos.

        Es muy tedioso implementarlo con archivos. Por lo que, no haré nada acá.
        */
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            var resource = false;
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourceID]) {
                    resource = true;
                    break;
                }
            }
            if (resource) {
                resources = resources.filter((e) => {
                    return e.id != req.params[this.resourceID];
                });
                console.log(resources);
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Recurso eliminado exitosamente');
                });
            } else {
                res.status(404).send('No existe el recurso especificado');
            }
        });
    }
}

module.exports = resourcesController;