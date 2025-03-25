import express from "express"; // Import the Express framework to handle routing and HTTP requests
import { registerUser, loginUser } from "../controllers/authController.js"; // Import controller functions for user registration and login

// Create a new Express router instance to define API endpoints
const router = express.Router();

// Define a POST endpoint for user registration
// When a POST request is made to '/register', the registerUser controller handles it
router.post("/register", registerUser);

// Define a POST endpoint for user login
// When a POST request is made to '/login', the loginUser controller handles it
router.post("/login", loginUser);

// Export the router so it can be integrated into the main application (e.g., in app.js)
export default router;