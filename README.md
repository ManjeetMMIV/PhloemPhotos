# PhloemPhotos
PhloemPhotos  "Capture the Essence!"  A community-driven platform for creators to find visual ideas, draw inspiration from a gallery of user-uploaded images, and share their own photographic work.
🌿 Phloem Photos: A Visual Inspiration and Community Platform

Phloem Photos is a high-quality, community-driven web application designed for creators and visual thinkers. It serves as a centralized gallery where users can search for inspiration, share their own photographic work, and engage with a curated feed of nature-inspired imagery.

This project demonstrates proficiency in the full-stack MERN-lite architecture, focusing on secure user authentication, efficient file handling, and robust database modeling.
<img width="1913" height="974" alt="image" src="https://github.com/user-attachments/assets/6211b471-1c0b-4961-b4f2-4790aa7d5325" />
<img width="1918" height="978" alt="image" src="https://github.com/user-attachments/assets/19c860b1-a781-4cbe-8d49-03adeaf11db1" />
<img width="1914" height="981" alt="image" src="https://github.com/user-attachments/assets/be86744c-2c57-440c-a5f1-f5cc0a8852f5" />
<img width="1914" height="979" alt="image" src="https://github.com/user-attachments/assets/50089355-a66d-42a5-a1d5-4b5f42a66cd4" />
<img width="1898" height="960" alt="image" src="https://github.com/user-attachments/assets/36afbefe-edb8-4ae2-a197-43b0c4942c20" />
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/08d00c24-d93f-482e-a7cc-8d8543474d7d" />

🚀 Key Features

Secure Authentication: User registration and login using industry-standard session management (Express Sessions).

Photo Uploads: Seamlessly upload high-resolution photos with metadata (title, description, tags) using Multer for file handling.

Dynamic Feed: Browse a responsive, infinite-scroll-style feed of community-contributed photos.

Search & Tagging: Powerful search capability based on tags and descriptions for finding specific visual inspiration.

User Profiles: Dedicated profiles to showcase a creator's uploaded content.

Minimalist UI: Clean, green-themed design () focusing attention on the image content.

💻 Tech Stack

Category

Technology

Purpose

Backend

Node.js & Express.js

Provides a robust, scalable API layer and handles routing, authentication, and database interaction.

Database

MongoDB

Flexible NoSQL database used to store user data, photo metadata, and tags.

Templating

EJS (Embedded JavaScript)

Used for dynamic rendering of HTML views (like the feed, profile, and login pages).

File Handling

Multer

Middleware for processing multipart/form-data, specifically for managing image uploads to the server.

Frontend

HTML5 & CSS3

Clean, responsive, and minimalist styling to complement the nature theme.

📂 Project Structure

The file structure is organized following standard Express conventions, making it clean and easy to navigate:

PINTEREST-CLONE/       # Project Root
├── bin/                 # Server startup script
├── models/              # MongoDB Schemas (e.g., User, Post)
├── public/              # Static assets accessible to the browser
│   ├── images/          # Image files
│   │   └── uploads/     # Destination for Multer uploaded images
│   ├── javascripts/     # Frontend JS files
│   └── stylesheets/     # CSS files
├── routes/              # Express routing modules
│   ├── index.js         # Public routes (Home, Login, Register)
│   ├── multer.js        # Multer configuration/middleware
│   ├── post.js          # Routes for handling photo posts (upload, search)
│   └── users.js         # Routes for user authentication and profiles
├── views/               # EJS template files
│   ├── partials/        # Reusable templates (navbar)
│   ├── error.ejs        
│   ├── feed.ejs         # Main photo gallery
│   ├── index.ejs        # Landing page
│   ├── login.ejs        
│   └── profile.ejs      
├── app.js               # Main Express application configuration
├── package.json         # Project dependencies and scripts
└── .env (Excluded)      # Environment variables (DB connection, secrets)


⚙️ Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

Node.js (v18+)

MongoDB (Local instance or MongoDB Atlas)

1. Clone the repository

git clone [Your-Repository-URL-Here]
cd phloem-photos


2. Install Dependencies

Install all necessary Node modules:

npm install


3. Environment Configuration

Create a file named .env in the project root to store sensitive configuration details.

# .env file

PORT=3000
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/phloemDB?retryWrites=true&w=majority"
SESSION_SECRET="A_Very_Long_And_Secure_Random_String"


Note: Replace the MongoDB URI with your actual connection string.

4. Database Setup

Ensure your MongoDB instance is running. The application will automatically create the necessary collections upon first run.

5. Run the Application

Start the Express server:

# For production/testing
npm start 

# For development (using nodemon)
npm run dev 


The application will be accessible at http://localhost:3000.

🤝 Contribution

This project is a personal portfolio piece, but suggestions and feature ideas are welcome!

✍️ Author

[Manjeet Singh/ ManjeetMMIV]
(This project was inspired by the need for a collaborative visual inspiration platform, blending photography and botanical concepts.)


