import Review from "../models/review.js"; // Import the Review model for handling review documents in the database
import Movie from "../models/movie.js";   // Import the Movie model to validate movie existence when adding reviews

// ⭐ Add a review to a movie
export const addReview = async (req, res) => {
    try {
        // Destructure movieId, reviewText, and rating from the request body
        const { movieId, reviewText, rating } = req.body;

        // Find the movie by its ID to ensure it exists before adding a review
        const movie = await Movie.findById(movieId);
        if (!movie) {
            // If the movie is not found, respond with a 404 status and an error message
            return res.status(404).json({ message: "Movie not found" });
        }

        // Create a new review object with the provided data and link it to the logged-in user
        const newReview = new Review({
            movie: movieId,       // Associate review with the specific movie
            user: req.user.id,    // Link the review to the logged-in user's ID
            reviewText,           // The text content of the review
            rating                // The rating provided in the review
        });

        // Save the new review to the database
        await newReview.save();
        // Respond with a 201 Created status and the newly added review data
        res.status(201).json({ message: "Review added successfully", data: newReview });
    } catch (error) {
        // In case of errors, respond with a 500 Internal Server Error and the error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 🔍 Get all reviews for a movie
export const getMovieReviews = async (req, res) => {
    try {
        // Find all reviews associated with the movieId provided in the request parameters
        // Populate the 'user' field to include the username from the linked user document
        const reviews = await Review.find({ movie: req.params.movieId }).populate("user", "username");
        // Respond with a 200 OK status and the list of reviews in JSON format
        res.status(200).json(reviews);
    } catch (error) {
        // If an error occurs, respond with a 500 status and the error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✏️ Update a review (only by the owner)
export const updateReview = async (req, res) => {
    try {
        // Find the review by its ID from the request parameters
        const review = await Review.findById(req.params.reviewId);

        // If no review is found, respond with a 404 Not Found status
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Ensure that the review belongs to the logged-in user before allowing an update
        if (review.user.toString() !== req.user.id) {
            // If the user is not the owner, respond with a 403 Forbidden status
            return res.status(403).json({ message: "You can only edit your own review" });
        }

        // Update the review's text and rating if new values are provided; otherwise, retain existing values
        review.reviewText = req.body.reviewText || review.reviewText;
        review.rating = req.body.rating || review.rating;
        // Save the updated review back to the database
        await review.save();

        // Respond with a success message and the updated review data
        res.json({ message: "Review updated", data: review });
    } catch (error) {
        // In case of any errors, respond with a 500 status and the error message
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ❌ Delete a review (only by the owner)
export const deleteReview = async (req, res) => {
    try {
        // Find the review by its ID from the request parameters
        const review = await Review.findById(req.params.reviewId);

        // If the review is not found, respond with a 404 Not Found status
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Verify that the logged-in user is the owner of the review
        if (review.user.toString() !== req.user.id) {
            // If the user is not the owner, respond with a 403 Forbidden status
            return res.status(403).json({ message: "You can only delete your own review" });
        }

        // Remove the review from the database
        await review.deleteOne();
        // Respond with a success message confirming deletion
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        // If an error occurs during deletion, respond with a 500 status and the error details
        res.status(500).json({ message: "Server error", error: error.message });
    }
};