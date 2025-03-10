import mongoose from "mongoose"; // Import Mongoose for MongoDB connection
import dotenv from "dotenv"; // Load environment variables from .env file

dotenv.config(); // Load .env variables

// Function to connect to MongoDB Atlas
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from .env
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "movie-review-db" // Specify the database name
        });

        console.log("✅ Connected to MongoDB Atlas"); // Log success message
    } catch (error) {
        console.error("❌ MongoDB connection error:", error); // Log connection error
        process.exit(1); // Stop the server if the database connection fails
    }
};

export default connectDB; // Export the connection function for use in server.js