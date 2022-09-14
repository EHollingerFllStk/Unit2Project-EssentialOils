const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipesSchema = new Schema({
    name: String,
    ingredients: String,
    use: String,
});

const Recipes = mongoose.model('Recipes', recipesSchema);

module.exports = Recipes;