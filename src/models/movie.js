import mongoose from "mongoose"; // Import mongoose for MongoDB interactions

// Define the movie schema outlining the structure of movie documents
const movieSchema = new mongoose.Schema({
  // Title of the movie, which is required
  title: { type: String, required: true },
  // Movie rating, also a required field
  rating: { type: Number, required: true },
  // Year of release; this field is optional
  releaseYear: { type: Number },
  // ID of the user who created the movie entry
  // This references the User model and is required for associating a movie with a user
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// Create the Movie model using the defined schema
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model for use in other parts of the application
export default Movie;