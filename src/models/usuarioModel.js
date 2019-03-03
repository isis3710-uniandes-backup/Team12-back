const schema = require("schm");

// La idea del esquema es agregar validación de los datos que llegan a la app.

const userSchema = schema({
	id: Number,
    name: String,
    lastname: String,
    dni: String,
    age: Number,
    email: String,
    password: String,
    phone: String,
    address: String,
    city: Number
});

module.exports = userSchema;
