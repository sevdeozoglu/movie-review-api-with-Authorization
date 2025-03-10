import express from "express";
import { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getAllMovies);       // Get all movies
router.get("/:id", getMovieById);    // Get a single movie by ID
router.post("/", addMovie);          // Add a new movie
router.put("/:id", updateMovie);     // Update a movie rating
router.delete("/:id", deleteMovie);  // Delete a movie

export default router;