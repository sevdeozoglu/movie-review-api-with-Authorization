import mongoose from "mongoose"; // Import Mongoose to define the schema and interact with MongoDB

// Define the schema for movies
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Movie title (required)
    rating: { type: Number, required: true }, // Movie rating (required, numeric)
    releaseYear: { type: Number } // Release year (optional)
});

// Create the Movie model using the schema
const Movie = mongoose.model("Movie", movieSchema);

export default Movie; // Export the model to use in controllers