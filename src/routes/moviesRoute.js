import express from "express"; // Import the Express framework for building API routes
import {
  getAllMovies,   // Controller function to fetch all movies
  getMovieById,   // Controller function to fetch a single movie by its ID
  addMovie,       // Controller function to add a new movie
  updateMovie,    // Controller function to update an existing movie
  deleteMovie,    // Controller function to delete a movie
  getMyMovies     // Controller function to fetch movies created by the logged-in user
} from "../controllers/movieController.js";
import { AuthGuard } from "../middleware/authMiddleware.js"; // Import middleware to protect routes requiring authentication

const router = express.Router(); // Create a new Express router instance

// Public route to get all movies
router.get("/", getAllMovies);

// Protected route to get movies created by the logged-in user
// The AuthGuard middleware ensures that only authenticated users can access this route
router.get("/mine", AuthGuard, getMyMovies);  // Only user's movies

// Public route to get a specific movie by its unique ID
router.get("/:id", getMovieById);

// Protected route to add a new movie
// AuthGuard is used to ensure only authenticated users can add a movie
router.post("/", AuthGuard, addMovie);        // Auth required

// Protected route to update an existing movie
// Only the owner of the movie (authenticated user) can perform this update
router.put("/:id", AuthGuard, updateMovie);   // Only owner can update

// Protected route to delete a movie
// Only the owner of the movie (authenticated user) can delete the movie
router.delete("/:id", AuthGuard, deleteMovie); // Only owner can delete

export default router; // Export the router to be used in the main application