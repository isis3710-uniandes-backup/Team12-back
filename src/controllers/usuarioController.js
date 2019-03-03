const fs = require('fs');
const userSchema = require('../models/usuarioModel');

let userFile = `${__dirname}/data/usuarios.json`;

// TODO: Falta implementar las validaciones utilizando el esquema

exports.list_all_users = function(req, res) {
    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(JSON.parse(data));
    });
};

exports.create_user = function(req, res) {
    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var users = JSON.parse(data);
        var user = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.body.id) {
                user = true;
                break;
            }
        }
        if (user) {
            res.status(400).send();
        } else {
            users.push(userSchema.parse(req.body));
            fs.writeFile(userFile, JSON.stringify(users), (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send();
            });
        }
    });
};

exports.read_a_user = function(req, res) {
    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var users = JSON.parse(data);
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.userID) {
                user = users[i];
                break;
            }
        }
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send();
        }
    });
};


exports.update_a_user = function(req, res) {
    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var users = JSON.parse(data);
        var user = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.userID) {
            	var newUser = userSchema.parse(req.body);
            	for (var key in newUser) {
            		if (newUser[key] !== undefined)
            			users[i][key] = newUser[key]; 
            	}
                user = true;
                break;
            }
        }
        if (user) {
            fs.writeFile(userFile, JSON.stringify(users), (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send();
            });
        } else {
            res.status(404).send();
        }
    });
};


exports.delete_a_user = function(req, res) {
    fs.readFile(userFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var users = JSON.parse(data);
        var user = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.userID) {
                user = true;
                break;
            }
        }
        if (user) {
            users = users.filter((e) => {
                return e.id !== req.params.userID;
            });
            fs.writeFile(userFile, JSON.stringify(users), (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send();
            });
        } else {
            res.status(404).send();
        }
    });
};