import mongoose from 'mongoose';

const receipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true }
        }
    ],
    instructions: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

// Create and export the Receipe model
const Receipe = mongoose.model('Receipe', receipeSchema);

export default Receipe;
