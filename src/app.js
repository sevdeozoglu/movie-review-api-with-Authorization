import express from 'express';
import cors from 'cors'; // Enables Cross-Origin Resource Sharing (frontend-backend communication)
import morgan from 'morgan'; // HTTP request logger middleware
import movieRouter from "./routes/moviesRoute.js";
import authRouter from "./routes/authRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import passport from 'passport';
import passportConfig from './config/passport.js';

const app = express();

//Global Middleware Setup

app.use(express.json());  // Parse incoming JSON requests
app.use(cors());          // Allow cross-origin requests (important for frontend integration)
app.use(morgan('dev'));   // Log requests to console in dev-friendly format

// Passport JWT Authentication

passportConfig(passport);      // Load Passport JWT strategy configuration
app.use(passport.initialize()); // Initialize Passport middleware

// Route Registration

app.use("/auth", authRouter);       // Auth routes: register, login
app.use("/movies", movieRouter);    // Movie CRUD routes
app.use("/reviews", reviewRouter);  // Review CRUD routes

// Basic Health Check Route for Vercel Deployment
app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

export default app;