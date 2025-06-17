// Your code here ...
import mongoose from 'mongoose';
const { Schema } = mongoose;
const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {
        type: [String],
        required: true
    },
    duration: { trype: Number, min: 0 },
isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;