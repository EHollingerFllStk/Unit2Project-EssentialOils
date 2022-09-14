const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes.js');

//ROUTES
//INDEX
// router.get('/', (req, res) => {
// 	res.render('recipes/index.ejs');
// });
//INDEX
router.get('/', (req, res) => {
	Recipes.find({}, (err, foundRecipes) => {
		res.render('recipes/index.ejs', {
			recipes: foundRecipes
		});
	});
});

//NEW
router.get('/new', (req, res) => {
	res.render('recipes/new.ejs');
});

//DELETE
router.delete('/:id', (req, res) => {
	Recipes.findByIdAndDelete(req.params.id, () => {
		res.redirect('/recipes');
	});
});

//UPDATE
router.put('/:id', (req, res) => {
	Recipes.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/recipes');
	});
});

//CREATE
router.post('/', (req, res) => {
	Recipes.create(req.body, (err, createdRecipe) => {
		res.redirect('/recipes');
	});
});

//EDIT
router.get('/:id/edit', (req, res) => {
	Recipes.findById(req.params.id, (err, foundRecipe) => {
		res.render('recipes/edit.ejs', {
			recipe: foundRecipe
		});
	});
});

//SHOW
router.get('/:id', (req, res) => {
	Recipes.findById(req.params.id, (err, foundRecipe) => {
		res.render('recipes/show.ejs', {
			recipe: foundRecipe
		});
	});
});


module.exports = router;