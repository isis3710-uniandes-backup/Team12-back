const schema = require("schm");

const citySchema = schema({
    id: Number,
    name: String
});

module.exports = citySchema;
