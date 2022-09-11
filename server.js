//DEPENDENCIES
const express = require("express");
const methodOverride = require('method-override')
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
app.use(methodOverride("_method"))


//ROUTES

// SEED
const oilSeed = require('./models/oilSeed.js');

app.get('/oils/seed', (req, res) => {
	Oils.deleteMany({}, (error, allOils) => {});

	Oils.create(oilSeed, (error, data) => {
		res.redirect('/oils');
	});
});


//INDEX
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

app.get('/oils', (req, res) => {
    Oils.find({}, (error, allOils) => {
        res.render('index.ejs', {
            oils: allOils
        })
    })
})

//NEW
app.get('/oils/new', (req, res) => {
    res.render('new.ejs')
})

//DELETE
app.delete("/oils/:id", (req, res) => {
    Oils.findByIdAndDelete(req.params.id, (err, foundOil) => {
        res.redirect('/oils')
    })
})

//UPDATE
app.put('/oils/:id', (req, res) => {
    Oils.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedOil) => {
            updatedOil.save()
            res.redirect(`/oils/${req.params.id}`)

        })
})

//CREATE
app.post('/oils', (req, res) => {
    Oils.create(req.body, (error, createdOil) => {
        res.redirect('index.ejs')
    })
})

//EDIT
app.get("/oils/:id/edit", (req, res) => {
    Oils.findById(req.params.id, (err, foundOil) => {
        res.render('edit.ejs', {
            oil: foundOil
        })
    })
})



//SHOW
app.get('/oils/:id', (req, res) => {
    Oils.findById(req.params.id, (err, foundOil) => {
        res.render('show.ejs', {
            oil: foundOil,
        })
    })
})



// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
