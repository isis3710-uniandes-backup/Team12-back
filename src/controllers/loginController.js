const fs = require('fs');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class loginController {
    constructor(pFile) {
        this.file = pFile;
    }

    get file() {
        return this._file;
    }

    set file(file) {
        this._file = file;;
    }

    login(req, res) {
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var resources = JSON.parse(data);
            var resource = null;
            const { email, password } = req.body;
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].email == email) {
                    resource = resources[i];
                    break;
                }
            }
            if (resource) {
                bcrypt.compare(password, resource.password, function(err, result) {
                    if (result) {
                        console.log("Valid!");
                        let token = jwt.sign({ email: req.body.email }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Signing the token
                        res.status(200).json({
                            sucess: true,
                            data: resource,
                            token
                        });
                    } else {
                        console.log("Entered Password and Hash do not match!");
                        res.status(401).json({
                            sucess: false,
                            token: null,
                            err: 'Entered Password and Hash do not match!'
                        });
                    }
                });
            } else {
                res.status(404).send('No se encuentra el recurso especificado');
            }
        });
    }
}

module.exports = loginController;