const fs = require('fs');
const Joi = require('joi');
const uuidv4 = require('uuid/v4');


class subresourcesController {
    constructor(pModel, pFile, pResourceID, pParentID) {
        this.model = pModel;
        this.file = pFile;
        this.resourcesID = pResourceID;
        this.parentID = pParentID;
    }

    get model() {
        return this._model;
    }

    get file() {
        return this._file;
    }

    get resourcesID() {
        return this._resourcesID;
    }

    get parentID() {
        return this._parentID;
    }

    set model(model) {
        this._model = model;
    }

    set file(file) {
        this._file = file;;
    }

    set resourcesID(resourcesID) {
        this._resourcesID = resourcesID;
    }

    set parentID(parentID) {
        this._parentID = parentID;
    }

    list_all(req, res) {
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            if (resources.length == 0) {
                res.status(200).json(JSON.parse(data));
                return;
            }
            var obj = {};
            for (var i = 0; i < this.resourcesID.length; i++) {
                obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
            }
            if (this.model.fk_on_list_all(obj)) {
                resources = resources.filter((e) => {
                    return e[this.parentID] == req.params[this.resourcesID[this.resourcesID.length - 2]];
                });
                res.status(200).json(JSON.parse(data));
            } else {
                res.status(400).send('problemas de llave foranea en la ruta');
            }
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
                res.status(400).send('El formato no corresponde con el esquema del recurso');
                return;
            }
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.body.id) {
                    resource = true;
                    break;
                }
            }
            if (resource) {
                res.status(400).send('Ya existe un recurso con ese identificador');
            } else {
                var obj = {};
                for (var i = 0; i < this.resourcesID.length; i++) {
                    obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
                }
                if (!this.model.fk_on_create(obj, req.body)) {
                    res.status(400).send('Problemas de llave foranea');
                    return;
                }
                resources.push(req.body);
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Recurso creado con éxito');
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
                if (resources[i].id == req.params[this.resourcesID[this.resourcesID.length - 1]]) {
                    resource = resources[i];
                    break;
                }
            }
            if (resource) {
                var obj = {};
                for (var i = 0; i < this.resourcesID.length; i++) {
                    obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
                }
                if (!this.model.fk_on_read_one(obj, resource)) {
                    res.status(400).send('Problemas de llave foranea');
                    return;
                }
                res.status(200).json(resource);
            } else {
                res.status(404).send('No se encontró el recurso especificado');
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
            var resource = null;
            var result = Joi.validate(req.body, this.model.updateSchema);
            if (result.error) {
                res.status(400).send('Solicitud inadecuada: revisar cuerpo de peticion');
                return;
            }
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourcesID[this.resourcesID.length - 1]]) {
                    var newresource = req.body;
                    for (var key in newresource) {
                        if (newresource[key] !== undefined)
                            resources[i][key] = newresource[key];
                    }
                    resource = resources[i];
                    break;
                }
            }
            if (resource) {
                var obj = {};
                for (var i = 0; i < this.resourcesID.length; i++) {
                    obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
                }
                if (!this.model.fk_on_update(obj, resource)) {
                    res.status(400).send('Problemas de llave foranea al actualizar');
                    return;
                }
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Se ha actualizado el recurso');
                });
            } else {
                res.status(404).send('No se encontró el recurso especificado');
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
            var resource = null;
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourcesID[this.resourcesID.length - 1]]) {
                    resource = resources[i];
                    break;
                }
            }
             if (resource) {
                var obj = {};
                for (var i = 0; i < this.resourcesID.length; i++) {
                    obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
                }
                if (!this.model.fk_on_delete(obj, resource)) {
                    res.status(400).send('Problemas de llave foranea al eliminar');
                    return;
                }
                resources = resources.filter((e) => {
                    return e.id != req.params[this.resourcesID[this.resourcesID.length - 1]];
                });
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send('Se eliminó el recurso exitosamente');
                });
            } else {
                res.status(404).send('El recurso especificado no existe');
            }
        });
    }
}

module.exports = subresourcesController;
