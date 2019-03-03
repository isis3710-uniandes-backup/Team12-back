const schema = require("schm");

const subcategorySchema = schema({
    id: Number,
    name: String,
    category_id: Number
});

module.exports = subcategorySchema;
