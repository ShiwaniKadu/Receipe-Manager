
import express from 'express';
import Receipe from '../models/ReceipeModel.js';

const router = express.Router();
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
            difficulty: req.body.difficulty || 'Medium'
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
        const receipes = await Receipe.find(); // Change findById to find()
        return res.status(200).json({
            count: receipes.length,
            data: receipes
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


//Route for Get One Receipe from database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;


        const receipes = await Receipe.findById(id); 
        return res.status(200).json({
            count : receipes.length,
            data : receipes
        });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});
//Route for Update Receipe from database

router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.ingredients || 
            !req.body.instructions || 
            !req.body.prepTime || 
            !req.body.cookTime
        ) {
            return res.status(400).send({
                message: "Send all required fields"
            });
        }

        const { id } = req.params;
        const result = await Receipe.findByIdAndUpdate(
            id, 
            { 
                title: req.body.title,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                prepTime: req.body.prepTime,
                cookTime: req.body.cookTime,
                servings: req.body.servings,
                difficulty: req.body.difficulty || 'Medium'
            }, 
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "Receipe not found" });
        }

        return res.status(200).send(result); // Send updated recipe back
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});
//Route for Delete Receipe from database

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const result = await Receipe.findOneAndDelete({ _id: id }); 

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