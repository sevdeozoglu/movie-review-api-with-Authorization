Overview

  The Movie Review API is a RESTful API that allows users to:
	Retrieve all movie reviews (GET /movies)
	Retrieve a specific movie review (GET /movies/:id)
	Add a new movie review (POST /movies)
	Update a movie rating (PUT /movies/:id)
	Delete a movie review (DELETE /movies/:id)

This version uses MongoDB Atlas as the database and Mongoose as the ODM.

 Installation & Setup
      
    Install Dependencies
      npm install
    
    Run the Server
      npm run dev
    
    If everything works, you’ll see:
      ✅ Connected to MongoDB Atlas
      🚀 Server running on http://localhost:5001

API Endpoints

    Retrieve All Movie Reviews
    Request Type: GET
	URL: http://localhost:5001/movies
	Response: [
      { "_id": "65f1a4c4e0b5bc002a5b1f6d", "title": "Inception", "rating": 9, "releaseYear": 2010 },
      { "_id": "65f1a4d2e0b5bc002a5b1f6e", "title": "Interstellar", "rating": 8.5, "releaseYear": 2014 }
    ]

    Retrieve a Single Movie Review
    Request Type: GET
	URL: http://localhost:5001/movies/1
	Response: (If Found){
    "_id": "65f1a4c4e0b5bc002a5b1f6d",
    "title": "Inception",
    "rating": 9,
    "releaseYear": 2010
    }
    If Not Found:
    {
    "message": "Movie not found"
    }

    Add a New Movie Review
    Request Type: POST
	URL: http://localhost:5001/movies
	Request Body (JSON): {
    "title": "The Dark Knight",
    "rating": 9.5,
    "releaseYear": 2008
    }
    Response: {
    "message": "Movie added successfully",
    "data": {
    "_id": "65f1a4d9e0b5bc002a5b1f6f",
    "title": "The Dark Knight",
    "rating": 9.5,
    "releaseYear": 2008
    }
    }

    Update a Movie Rating
    Request Type: PUT
	URL: http://localhost:5001/movies/1
	Request Body (JSON): {
    "rating": 9.8
    }
    Response: {
    "message": "Movie updated successfully",
    "data": {
    "_id": "65f1a4c4e0b5bc002a5b1f6d",
    "title": "Inception",
    "rating": 9.8,
    "releaseYear": 2010
    }
    }

    Delete a Movie Review
	Request Type: DELETE
	URL: http://localhost:5001/movies/1
	Response: {
    "message": "Movie deleted successfully"
    }

    Project Structure

    movie-review-api/
    │── node_modules/          # Installed dependencies
    │── src/
    │   ├── controllers/       # Handles API logic
    │   │   ├── movieController.js
    │   ├── models/            # Defines database schemas
    │   │   ├── movie.js
    │   ├── routes/            # Defines API routes
    │   │   ├── moviesRoute.js
    │   ├── config/            # Database connection
    │   │   ├── db.js
    │   ├── middleware/        # Custom middleware (error handling, logging, etc.)
    │   ├── app.js             # Express app setup (middleware, routes)
    │   ├── server.js          # Main server file (connects to MongoDB, starts Express)
    │── .env                   # Environment variables (MongoDB URI, port)
    │── .gitignore             # Ignore files (node_modules, .env)
    │── package.json           # Project dependencies
    │── README.md              # Project documentation

    Technologies Used

    Node.js - JavaScript runtime
	  Express.js - Web framework for handling API requests
	  MongoDB Atlas - Cloud database for storing movie reviews
	  Mongoose - ODM library for MongoDB
	  dotenv - Manages environment variables
	  morgan - Logs API requests for debugging

    How to Test the API

    Using Postman
	  1.Open Postman and enter the API URL (http://localhost:5001/movies).
	  2.Choose the HTTP method (GET, POST, PUT, DELETE).
	  3.Send the request and check the response.

    Error Handling

    Error Type	                       Response
    Invalid Movie ID                   { "message": "Movie not found" } (404)
    Missing Fields in POST /movies     { "message": "Validation error" } (400)
    Database Connection Failure        { "message": "Server error" } (500)