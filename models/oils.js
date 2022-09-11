const mongoose = require('mongoose');

const oilsSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    use: String,
});

const Oils = mongoose.model('Oils', oilsSchema);

module.exports = Oils;