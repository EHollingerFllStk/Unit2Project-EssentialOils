//DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
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


//ROUTES
//INDEX
//NEW

//DELETE
//UPDATE

//CREATE
app.post('/oils', (req, res) => {
    Oils.create(req.body, (error, createdOil) => {
        res.send(createdOil)
    })
})


//EDIT

//SHOW





// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
