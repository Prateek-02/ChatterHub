# ChatterHub

# ChatterHub is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. This project provides a full-stack web application with distinct frontend and backend components, enabling seamless, real-time communication between users.

# Project Structure
# Here's an overview of the project's directory structure:
#
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection setup (MongoDB)
│   │   ├── middleware/
│   │   │   ├── auth.js             # Authentication middleware (JWT)
│   │   │   └── errorHandler.js     # Centralized error handling
│   │   ├── models/
│   │   │   ├── Message.js          # Mongoose schema for chat messages
│   │   │   └── User.js             # Mongoose schema for user data
│   │   ├── routes/
│   │   │   ├── auth.js             # Authentication routes (login, register)
│   │   │   ├── messages.js         # API routes for message operations
│   │   │   └── userRoutes.js       # API routes for user-related actions
│   │   ├── sockets/
│   │   │   └── index.js            # Socket.IO configurations and event handlers
│   │   └── server.js               # Main Express.js server entry point
│   ├── .env                        # Environment variables (e.g., MONGO_URI, JWT_SECRET)
│   ├── .gitignore                  # Git ignore rules for backend
│   ├── package-lock.json
│   └── package.json                # Backend dependencies and scripts
└── frontend/
    ├── public/
    │   └── vite.svg                # Default Vite SVG icon
    ├── src/
    │   ├── assets/
    │   │   └── react.svg           # Default React SVG icon
    │   ├── components/
    │   │   ├── ChatBox.jsx         # Component for displaying chat messages
    │   │   └── MessageItem.jsx     # Component for individual message display
    │   ├── context/
    │   │   ├── SocketContext.jsx   # React Context for Socket.IO instance
    │   │   └── SocketProvider.jsx  # Provider for Socket.IO Context
    │   ├── hooks/
    │   │   └── useAuth.js          # Custom hook for managing authentication state
    │   ├── pages/
    │   │   ├── Home.jsx            # Main chat application page
    │   │   ├── Login.jsx           # User login page
    │   │   ├── Register.jsx        # User registration page
    │   │   └── Welcome.jsx         # Welcome/landing page
    │   ├── services/
    │   │   └── api.js              # API client for interacting with the backend
    │   ├── App.jsx                 # Root React component, handles routing
    │   ├── index.css               # Global CSS styles
    │   └── main.jsx                # Entry point for the React application
    ├── .env                        # Environment variables (e.g., VITE_BACKEND_URL)
    ├── .gitignore                  # Git ignore rules for frontend
    ├── README.md                   # This very README file
    ├── eslint.config.js
    ├── index.html                  # Main HTML file for the React app
    ├── package-lock.json
    ├── package.json                # Frontend dependencies and scripts
    └── vite.config.js              # Vite build configuration

# Backend Overview
The backend/ directory houses the Node.js server, powered by Express.js. This part of the application is responsible for:

# API Endpoints: Exposing RESTful APIs for user authentication, message handling, and other data operations.

# Database Interaction: Managing connections to a MongoDB database via Mongoose for data storage and retrieval.

# Authentication: Implementing user registration and login using JSON Web Tokens (JWT) for secure sessions.

Real-time Communication: Utilizing Socket.IO to enable instant, bi-directional communication for chat messages.

Middleware: Custom Express middleware for authentication and robust error handling.

Frontend Overview
The frontend/ directory contains the React application, built with Vite for a fast development experience. This part of the application focuses on:

User Interface: Providing an intuitive and responsive chat interface.

State Management: Using React hooks and Context API for managing application state, including user authentication and Socket.IO connection.

API Integration: Communicating with the backend API to send and receive data.

Real-time Display: Rendering chat messages in real-time as they are sent and received via Socket.IO.

Routing: Managing different views and pages within the single-page application.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Download Node.js (LTS version recommended)

MongoDB: A running MongoDB instance. You can install it locally, use MongoDB Atlas (cloud-hosted), or use Docker.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/ChatterHub.git
cd ChatterHub
Set up the Backend:
Navigate to the backend directory, install dependencies, and create your environment file.

Bash

cd backend
npm install
Create a .env file in the backend/ directory and add your MongoDB connection string and a secret key for JWT:

Code snippet

MONGO_URI=mongodb://localhost:27017/chatterhub # Or your MongoDB Atlas connection string
JWT_SECRET=your_super_secret_jwt_key
Replace your_super_secret_jwt_key with a strong, random string.

Set up the Frontend:
Navigate to the frontend directory, install dependencies, and create its environment file.

Bash

cd ../frontend
npm install
Create a .env file in the frontend/ directory and specify the URL where your backend server will be running:

Code snippet

VITE_BACKEND_URL=http://localhost:5000
Running the Application
After setting up both the backend and frontend, you can start the application:

Start the Backend Server:
Open a new terminal, navigate to the backend directory, and run the development server:

Bash

cd backend
npm run dev
The backend server will typically start on http://localhost:5000.

Start the Frontend Development Server:
Open another new terminal, navigate to the frontend directory, and run the development server:

Bash

cd frontend
npm run dev
The frontend application will usually open in your default browser at http://localhost:5173 (or a similar port provided by Vite).

Key Features
🔐 User Authentication: Secure user registration and login system powered by JSON Web Tokens (JWT).

⚡ Real-time Messaging: Instant message delivery and display through Socket.IO, providing a dynamic chat experience.

📦 Modular Codebase: A well-structured and organized project, making it easy to understand, maintain, and extend.

🚀 Scalable Architecture: Clear separation between frontend and backend, allowing independent development and deployment.