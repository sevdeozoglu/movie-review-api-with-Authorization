import express from 'express';
import cors from 'cors'; // Enables Cross-Origin Resource Sharing
import morgan from 'morgan'; // Logs API requests
import movieRouter from "./routes/moviesRoute.js";

const app = express();

// Middleware
app.use(express.json());  // Allow JSON requests
app.use(cors());          // Enable CORS
app.use(morgan('dev'));   // Log requests

// Use the movies routes
app.use("/movies", movieRouter);

export default app;