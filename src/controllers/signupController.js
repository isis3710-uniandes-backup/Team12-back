const fs = require('fs');
const { secretToken } = require('../config');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

class loginController {
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

    signup(req, res) {
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
            if (!this.model.fk_on_create(req.body)) {
                res.status(400).send('Problemas con la llave foranea');
            } else if (resource) {
                res.status(400).send('Ya existe un recurso con ese identificador');
            } else {
                const saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    req.body.password = hash;
                    resources.push(req.body);
                    fs.writeFile(this.file, JSON.stringify(resources), (err) => {
                        if (err) {
                            throw err;
                        }
                        let token = jwt.sign({ email: req.body.email }, secretToken, { expiresIn: 129600 }); // Signing the token
                        res.status(200).json({
                            sucess: true,
                            data: req.body,
                            token
                        });
                    });
                });

            }
        });
    }
}

module.exports = loginController;