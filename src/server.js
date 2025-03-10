import app from "./app.js"; // Import the Express app
import dotenv from "dotenv"; // Load environment variables from .env file
import connectDB from "./config/db.js"; // Import the function to connect to MongoDB

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB Atlas

// Define the port number (use .env value if available, otherwise default to 5001)
const PORT = process.env.PORT || 5001;

// Start the server and listen for requests
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));