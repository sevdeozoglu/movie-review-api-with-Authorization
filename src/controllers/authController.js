// Import the jsonwebtoken library to handle JWT operations
import jwt from 'jsonwebtoken';
// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';
// Import the User model from the models directory
import User from '../models/user.js';

// Load environment variables from the .env file into process.env
dotenv.config();

// Function to generate a JWT token for a given user
const generateToken = (user) => {
  // Create a token containing the user's id and username.
  // The token is signed with the secret from environment variables and expires in 1 hour.
  return jwt.sign(
    { id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Controller to handle user registration
export const registerUser = async (req, res) => {
  try {
    // Create a new user instance using the data provided in the request body
    const user = new User(req.body);
    // Save the user to the database
    await user.save();
    // Send a success response with a 201 status code (Created)
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // If an error occurs (e.g., validation error), send a 400 status code (Bad Request) with the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller to handle user login
export const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find a user in the database matching the provided email
    const user = await User.findOne({ email });

    // Validate user existence and check if the password is correct
    // The comparePassword method should be defined in the User model to handle password comparison
    if (!user || !(await user.comparePassword(password))) {
      // If credentials are invalid, send a 401 status code (Unauthorized) with an error message
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user);

    // Send the token back to the client in the response
    res.json({ token });
  } catch (error) {
    // If a server error occurs, send a 500 status code (Internal Server Error) with the error message
    res.status(500).json({ error: error.message });
  }
};