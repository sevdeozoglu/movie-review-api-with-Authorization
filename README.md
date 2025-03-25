Movie Review API

A secure, RESTful API built with Express.js, MongoDB, and Passport.js for user authentication. It allows users to manage movies and reviews — with full ownership control.

Features
	User registration and login (with password hashing)
	JWT-based authentication using Passport.js
	CRUD operations on movies and reviews
	Users can only manage their own movies and reviews
	Environment-based config for sensitive data

Getting Started
  Node.js (v18+ recommended)
	MongoDB Atlas account
	Postman (or any API client)

Install Dependencies
  npm install

Set Up Environment Variables
  Create a .env file in the root with:
  MONGODB_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_super_secret_key

  To generate a secure secret key:
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

Run the App
  npm run dev

The server runs at:
http://localhost:5001


API Endpoints

Auth Routes

Method	    Route	                 Description
POST	      /api/auth/register	   Register new user
POST	      /api/auth/login	       Login, returns JWT token

Movie Routes

Method	     Route	             Description	         Auth Required
GET	         /api/movies	       Get all movies	           ❌
GET	         /api/movies/mine	   Get your own movies	     ✅
GET	         /api/movies/:id	   Get movie by ID	         ❌
POST	       /api/movies	       Add a new movie	         ✅
PUT	         /api/movies/:id	   Update your movie	       ✅
DELETE	     /api/movies/:id	   Delete your movie	       ✅

Review Routes

Method	     Route	                   Description	              Auth Required
GET	         /api/reviews/:movieId	   Get reviews for a movie	       ❌ 
POST	       /api/reviews	             Add a review to a movie	       ✅
PUT	         /api/reviews/:reviewId	   Update your review	             ✅
DELETE	     /api/reviews/:reviewId	   Delete your review	             ✅

Authentication Overview

	Login returns a JWT token
	Include it in the Authorization header for protected routes:
  Authorization: Bearer YOUR_TOKEN_HERE

Project Structure

src/
├── config/           # passport.js, db.js
├── controllers/      # Logic for movies, reviews, auth
├── middleware/       # AuthGuard using passport
├── models/           # Mongoose models (User, Movie, Review)
├── routes/           # Express route definitions
├── app.js            # Express setup
└── server.js         # Entry point