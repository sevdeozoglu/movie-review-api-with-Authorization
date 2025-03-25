import mongoose from "mongoose"; // Import mongoose to define schemas and interact with MongoDB

// Define the review schema that represents a review document in MongoDB
const reviewSchema = new mongoose.Schema({
  // Reference to the associated movie; this field links to the Movie model
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  // Reference to the user who wrote the review; links to the User model
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // The content of the review; a required text field
  reviewText: { type: String, required: true },
  // The rating provided in the review; required and must be between 1 and 10
  rating: { type: Number, required: true, min: 1, max: 10 }
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields to each review document
  timestamps: true
});

// Create the Review model based on the review schema
const Review = mongoose.model("Review", reviewSchema);

// Export the Review model for use in other parts of the application
export default Review;