const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 20},
    price: {type: Number, required: true},
});

// To use our schema definition, we need to convert our ProductSchema into a Model that 
// we can work with. To do so, we pass it into mongoose.model(modelName, schema) and
// then export it so we can use it in other files

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;