
const express = require('express')
const oilsRouter = express.Router()
const Oils = require('../models/oils')




//SEED
const oilSeed = require('../models/oilSeed')
oilsRouter.get('/seed', (req, res) => {
	Oils.deleteMany({}, (error, allOils) => {});

	Oils.create(oilSeed, (error, data) => {
		res.redirect('/oils');
	});
});

//INDEX
oilsRouter.get('/oils', (req, res) => {
    Oils.find({}, (error, allOils) => {
        res.render('index.ejs', {
            oils: allOils
        })
    })
})

//NEW
oilsRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})

//DELETE
oilsRouter.delete("/:id", (req, res) => {
    Oils.findByIdAndDelete(req.params.id, (err, foundOil) => {
        res.redirect('/oils')
    })
})

//UPDATE
oilsRouter.put('/:id', (req, res) => {
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
oilsRouter.post('/', (req, res) => {
    Oils.create(req.body, (error, createdOils) => {
        res.redirect('/oils')
    })
})

//EDIT
oilsRouter.get("/:id/edit", (req, res) => {
    Oils.findById(req.params.id, (err, foundOil) => {
        res.render('edit.ejs', {
            oil: foundOil
        })
    })
})

//SHOW
oilsRouter.get('/:id', (req, res) => {
    Oils.findById(req.params.id, (err, foundOil) => {
        res.render('show.ejs', {
            oil: foundOil,
        })
    })
})

module.exports = oilsRouter;