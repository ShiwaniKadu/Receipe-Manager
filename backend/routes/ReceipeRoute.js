
import express from 'express';
import Receipe from '../models/ReceipeModel.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import mongoose from 'mongoose';

const router = express.Router();

router.use(checkUserAuth);

//Route for Save a new Receipe 
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.ingredients || 
            !req.body.instructions || 
            !req.body.prepTime || 
            !req.body.cookTime
        ) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        const newReceipe = new Receipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            difficulty: req.body.difficulty || 'Medium',
            user: req.user._id
        });

        const receipe = await newReceipe.save();
        return res.status(201).send(receipe);
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});
//Route for Get All Receipe from database
router.get('/', async (req, res) => {
    try {
        console.log('Authenticated user ID:', req.user._id);
        const receipes = await Receipe.find({ user: req.user._id });
        return res.status(200).json({
            count: receipes.length,
            data: receipes
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

const checkRecipeOwnership = async (id, userId) => {
    const recipe = await Receipe.findOne({ _id: id, user: userId });
    if (!recipe) {
        throw new Error('Recipe not found or not authorized');
    }
    return recipe;
};

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the recipe belongs to the authenticated user
        const recipe = await Receipe.findOne({ _id: id, user: req.user._id });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found or unauthorized' });
        }

        return res.status(200).json({ data: recipe });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


// Update recipe
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const receipe = await checkRecipeOwnership(id, req.user._id);

        const updatedData = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            difficulty: req.body.difficulty || 'Medium',
        };

        const updatedReceipe = await Receipe.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).send(updatedReceipe);
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

//Route for Delete Receipe from database

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const result = await Receipe.findOneAndDelete({ _id: id, user: req.user._id }); 

        if (!result) {
            return res.status(404).json({ message: "Receipe not found" }); 
        }

        return res.status(200).send({ message: "Receipe deleted successfully." }); 
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message }); 
    }
});

export default router;