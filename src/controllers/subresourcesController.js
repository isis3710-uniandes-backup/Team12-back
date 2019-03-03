const fs = require('fs');
const Joi = require('joi');

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
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            resources = resources.filter((e) => {
                return e[this.parentID] == req.params[this.resourcesID[this.resourcesID.length - 2]];
            });
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
            var obj = {};
            for (var i = 0; i < this.resourcesID.length; i++) {
                obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
            }
            if (!this.model.fk_on_create(obj, req.body)) {
                res.status(400).send();
            } else if (resource) {
                res.status(400).send();
            } else {
                resources.push(req.body);
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send();
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
                res.status(200).json(resource);
            } else {
                res.status(404).send();
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
                res.status(400).send();
                return;
            }
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id == req.params[this.resourcesID[this.resourcesID.length - 1]]) {
                    var newresource = req.body;
                    for (var key in newresource) {
                        if (newresource[key] !== undefined)
                            resources[i][key] = newresource[key];
                    }
                    resource = true;
                    break;
                }
            }
            var obj = {};
            for (var i = 0; i < this.resourcesID.length; i++) {
                obj[this.resourcesID[i]] = req.params[this.resourcesID[i]];
            }
            if (!this.model.fk_on_update(obj, req.body)) {
                res.status(400).send();
            } else if (resource) {
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send();
                });
            } else {
                res.status(404).send();
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
                if (resources[i].id == req.params[this.resourcesID[this.resourcesID.length - 1]]) {
                    resource = true;
                    break;
                }
            }
            if (resource) {
                resources = resources.filter((e) => {
                    return e.id != req.params[this.resourcesID[this.resourcesID.length - 1]];
                });
                console.log(resources);
                fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).send();
                });
            } else {
                res.status(404).send();
            }
        });
    }
}

module.exports = subresourcesController;