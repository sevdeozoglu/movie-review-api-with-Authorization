import express from "express"; // Import Express to set up routing
import {
  addReview,      // Controller to add a new review
  getMovieReviews, // Controller to retrieve all reviews for a specific movie
  updateReview,   // Controller to update an existing review
  deleteReview    // Controller to delete a review
} from "../controllers/reviewController.js";

import { AuthGuard } from "../middleware/authMiddleware.js"; // Import authentication middleware to protect certain routes

const router = express.Router(); // Create a new router instance

// Public Route: Retrieve reviews for a specific movie by its movieId.
// This route is public, so anyone can access the reviews without authentication.
router.get("/:movieId", getMovieReviews);

// Protected Routes: The following routes require the user to be authenticated.

// POST route to add a new review.
// The AuthGuard middleware ensures that only logged-in users can add a review.
router.post("/", AuthGuard, addReview);

// PUT route to update an existing review.
// Only the owner of the review (authenticated user) can update their review.
router.put("/:reviewId", AuthGuard, updateReview);

// DELETE route to remove a review.
// Only the owner (authenticated user) can delete their review.
router.delete("/:reviewId", AuthGuard, deleteReview);

export default router; // Export the router to be used in the main application