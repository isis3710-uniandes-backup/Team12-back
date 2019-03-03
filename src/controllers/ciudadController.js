const fs = require('fs');
const citySchema = require('../models/ciudadModel');

let cityFile = `${__dirname}/data/ciudades.json`;

// TODO: Falta implementar las validaciones utilizando el esquema

exports.list_all_cities = function(req, res) {
    fs.readFile(cityFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(JSON.parse(data));
    });
};

exports.create_city = function(req, res) {
    fs.readFile(cityFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var cities = JSON.parse(data);
        var city = false;
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].id == req.body.id) {
                city = true;
                break;
            }
        }
        if (city) {
            res.status(400).send();
        } else {
            cities.push(citySchema.parse(req.body));
            fs.writeFile(cityFile, JSON.stringify(cities), (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send();
            });
        }
    });
};

exports.read_a_city = function(req, res) {
    fs.readFile(cityFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var cities = JSON.parse(data);
        var city = null;
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].id == req.params.userID) {
                city = cities[i];
                break;
            }
        }
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).send();
        }
    });
};


exports.update_a_user = function(req, res) {
    fs.readFile(cityFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var cities = JSON.parse(data);
        var city = false;
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].id == req.params.userID) {
            	var newCity = citySchema.parse(req.body);
            	for (var key in newUser) {
            		if (newCity[key] !== undefined)
            			cities[i][key] = newCity[key]; 
            	}
                city = true;
                break;
            }
        }
        if (city) {
            fs.writeFile(cityFile, JSON.stringify(cities), (err) => {
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
    fs.readFile(cityFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var cities = JSON.parse(data);
        var city = false;
        for (var i = 0; i < cities.length; i++) {
            if (cities[i].id == req.params.userID) {
                city = true;
                break;
            }
        }
        if (city) {
            cities = cities.filter((e) => {
                return e.id !== req.params.userID;
            });
            fs.writeFile(cityFile, JSON.stringify(cities), (err) => {
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