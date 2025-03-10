import Movie from "../models/movie.js"; // Import the Movie model from the database

// GET all movies - Fetches all movie reviews from the database
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); // Get all movies from MongoDB
        res.status(200).json(movies); // Return the movies as JSON
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message }); // Handle errors
    }
};

// GET a specific movie by ID - Fetches a single movie review
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Find movie by its unique ID
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" }); // Return 404 if movie not found
        }
        res.json(movie); // Return the movie details
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST - Add a new movie to the database
export const addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body); // Create a new movie using request data
        await newMovie.save(); // Save the movie to MongoDB
        res.status(201).json({ message: "Movie added successfully", data: newMovie }); // Return success response
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT - Update a movie rating or details
export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update movie data
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" }); // Return 404 if movie doesn't exist
        }
        res.json({ message: "Movie updated successfully", data: updatedMovie }); // Return updated movie data
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE - Remove a movie from the database
export const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id); // Find and delete movie
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" }); // Return 404 if no movie found
        }
        res.json({ message: "Movie deleted successfully" }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};