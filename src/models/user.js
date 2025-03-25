import mongoose from "mongoose"; // Import mongoose to define schemas and interact with MongoDB
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords securely
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 to generate unique user IDs

// Define a schema for the User model with fields: user_id, username, email, and password
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4, // Automatically generate a unique ID for each user using uuidv4
    unique: true,    // Ensure that each user_id is unique
  },
  username: {
    type: String,
    unique: true,    // Enforce unique usernames
  },
  email: {
    type: String,
    unique: true,    // Enforce unique emails
  },
  password: {
    type: String,    // Store the hashed password
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Pre-save middleware to hash the password before saving the user document
userSchema.pre('save', async function (next) {
  // If the password field hasn't been modified, skip hashing
  if (!this.isModified('password')) return next();
  // Hash the password with a salt factor of 10
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Proceed to save the user document
});

// Instance method to compare a provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
export default User;