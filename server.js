//DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const app = express();
require("dotenv").config();
const Oils = require('./models/oils')


//DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(express.static('public'))

const oilsController = require('./controllers/oils')
app.use('/oils', oilsController)

const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);


//Routes

//index
app.get('/', (req, res) => {
    res.render('index.ejs');
});



// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
