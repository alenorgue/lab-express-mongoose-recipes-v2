require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// DATABASE CONNECTION
const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER
} = process.env;

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/express-mongoose-recipes-dev`;

async function connectDB() {
    try {
        const x = await mongoose.connect(MONGODB_URI);
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    } catch (err) {
        console.error("Error connecting to mongo", err);
    }
}

console.log("Recipe model:", Recipe);

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    const newRecipe = new Recipe({
            title: req.body.title,
            level: req.body.level,
            ingredients: req.body.ingredients,
            duration: req.body.duration,
            isArchived: req.body.isArchived
        });
    try {
             await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) => res.status(200).json(recipes))
        .catch(err => res.status(500).json({ error: err.message }));
}
);

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
})
        .catch(err => res.status(500).json({ error: err.message }));
}
);
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((updatedRecipe) => res.status(200).json(updatedRecipe))
        .catch(err => res.status(500).json({ error: err.message }));
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Recipe deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Start the server solo después de conectar a MongoDB
async function startServer() {
    await connectDB();
    app.listen(3000, () => console.log('My first app listening on port 3000!'));
}
startServer();


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;

