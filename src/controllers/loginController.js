const fs = require('fs');

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
                if (resources[i].email == email && resources[i].password == password) {
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
}

module.exports = loginController;