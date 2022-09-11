//DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
// const Product = require("./models/products")
// const Seed = require("./models/seedroute")
// const methodOverride = require("method-override");
// const productRouter = require("./controllers/productRouter");

//DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"))
// app.use('/products', productRouter)
// app.use(express.static('public'))

//ROUTES
//INDEX
//NEW
//DELETE
//UPDATE

//CREATE
app.post('/essoils', (req, res) => {
    res.send(req.body)
})


//EDIT

//SHOW





// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
