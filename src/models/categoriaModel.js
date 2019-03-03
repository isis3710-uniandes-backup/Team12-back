const schema = require("schm");

const categorySchema = schema({
    id: Number,
    name: String
});

module.exports = categorySchema;
