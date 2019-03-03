const schema = require("schm");

const objectSchema = schema({
    id: Number,
    name: String,
    price: Number,
    rating: Number,
    seller_id:Number,
    description: String,
    subcategory_id:Number
});

module.exports = objectSchema;
