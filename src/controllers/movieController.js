import Movie from "../models/movie.js"; // Import the Movie model to interact with the movies collection in the database

// GET all movies - Retrieves all movie records from the database
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); // Query MongoDB for all movies
        res.status(200).json(movies); // Return the list of movies as JSON with a 200 OK status
    } catch (error) {
        // If an error occurs, return a 500 status (Server Error) with the error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET a specific movie by ID - Retrieves a single movie based on its unique identifier
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Find a movie using the provided ID from the request parameters
        if (!movie) {
            // If the movie is not found, return a 404 Not Found response with a message
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie); // Return the found movie as JSON with a 200 OK status
    } catch (error) {
        // In case of an error (e.g., invalid ID format), return a 500 status with error details
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST - Add a new movie to the database
export const addMovie = async (req, res) => {
    try {
        // Create a new movie document, merging the request body data and setting the creator to the logged-in user's ID
        const newMovie = new Movie({
            ...req.body,
            createdBy: req.user.id // Associate the movie with the user who created it
        });

        await newMovie.save(); // Save the new movie to the database
        // Return a 201 Created response with a success message and the new movie data
        res.status(201).json({ message: "Movie added successfully", data: newMovie });
    } catch (error) {
        // On error, return a 500 Server Error status with the error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT - Update a movie's details (including rating or other attributes)
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Retrieve the movie by its ID

        if (!movie) 
            return res.status(404).json({ message: "Movie not found" }); // Return 404 if the movie doesn't exist

        // Check if the logged-in user is the creator of the movie by comparing IDs
        if (movie.createdBy.toString() !== req.user.id) {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ message: "You are not allowed to edit this movie" });
        }

        // Update the movie with the new data from the request body, and return the updated document
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Movie updated successfully", data: updatedMovie }); // Return the updated movie data
    } catch (error) {
        // In case of an error, return a 500 Server Error response with error details
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE - Remove a movie from the database
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Retrieve the movie by its ID

        if (!movie) 
            return res.status(404).json({ message: "Movie not found" }); // Return 404 if the movie is not found

        // Ensure that the user attempting to delete is the creator of the movie
        if (movie.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not allowed to delete this movie" });
        }

        await movie.deleteOne(); // Delete the movie document from the database
        res.json({ message: "Movie deleted successfully" }); // Return a success message
    } catch (error) {
        // If an error occurs during deletion, return a 500 Server Error with details
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 🔐 GET movies created by the logged-in user - Retrieves movies where the creator is the current user
export const getMyMovies = async (req, res) => {
    try {
        // Find movies that match the logged-in user's ID in the createdBy field
        const movies = await Movie.find({ createdBy: req.user.id });
        res.status(200).json(movies); // Return the user's movies with a 200 OK status
    } catch (error) {
        // Return a 500 Server Error response if something goes wrong
        res.status(500).json({ message: "Server error", error: error.message });
    }
};