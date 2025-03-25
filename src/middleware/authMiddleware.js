import passport from "passport"; // Import the Passport authentication middleware

// Create and export an authentication middleware named 'AuthGuard' that uses the JWT strategy.
// The 'session: false' option indicates that Passport should not use sessions to store user data.
export const AuthGuard = passport.authenticate("jwt", { session: false });