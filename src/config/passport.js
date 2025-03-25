// Passport JWT Strategy Configuration

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; // Import Passport JWT strategy components
import dotenv from 'dotenv'; // Load environment variables from .env
import User from '../models/user.js'; // Mongoose User model

dotenv.config(); // Initialize dotenv to access JWT_SECRET

// JWT strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header: Bearer <token>
    secretOrKey: process.env.JWT_SECRET // Secret key for verifying JWT signature
};

// Export strategy configuration function
export default (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                // Look up user by their UUID (user_id from JWT payload)
                const user = await User.findOne({ user_id: jwt_payload.id });

                if (user) {
                    return done(null, user); // Authenticated
                } else {
                    return done(null, false); // User not found
                }
            } catch (error) {
                return done(error, false); // Internal server error
            }
        })
    );
};