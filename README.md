🍽️ Recipe Manager
A full-stack Recipe Manager application built using Node.js, Express, MongoDB, and React. This app allows users to create, update, delete, and view recipes.

🌟 Features
Create Recipes: Add new recipes with detailed information like ingredients, instructions, prep time, cook time, and servings.
View Recipes: View a list of all recipes with easy-to-navigate UI.
Update Recipes: Modify existing recipes with updated details.
Delete Recipes: Remove recipes you no longer need.
Responsive UI: A simple and responsive UI using React.
🛠️ Tech Stack
Backend: Node.js, Express, MongoDB
Frontend: React.js
Database: MongoDB
Libraries:
axios for making HTTP requests
react-icons for icons
mongoose for MongoDB object modeling
🚀 Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/receipe-manager.git
cd receipe-manager
2. Install Dependencies
For the Backend (Node.js + Express):

bash
Copy code
cd backend
npm install
For the Frontend (React):

bash
Copy code
cd frontend
npm install
3. Setup Environment Variables
Create a .env file in the backend folder and add your MongoDB connection string and port configuration:

bash
Copy code
PORT=3000
mongoDBURL=mongodb://localhost:27017/recipeDB
4. Run the Backend Server
bash
Copy code
cd backend
npm start
This will run the server on http://localhost:3000.

5. Run the Frontend (React)
bash
Copy code
cd frontend
npm start
This will start the React development server on http://localhost:3001 (or another port if configured).

🧑‍💻 API Endpoints
Here are the available API endpoints:

Method	Endpoint	Description
GET	/receipe	Get all recipes
GET	/receipe/:id	Get a specific recipe by ID
POST	/receipe	Create a new recipe
PUT	/receipe/:id	Update an existing recipe
DELETE	/receipe/:id	Delete a recipe by ID
Sample Request to Add a Recipe (POST)
bash
Copy code
POST /receipe
{
    "title": "Pasta",
    "ingredients": [
        { "name": "Pasta", "quantity": "200g" },
        { "name": "Tomato Sauce", "quantity": "100g" }
    ],
    "instructions": "Boil pasta. Add sauce. Serve hot.",
    "prepTime": 10,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Easy"
}
🛠️ Project Structure
bash
Copy code
.
├── backend
│   ├── models
│   │   └── Receipe.js        # Mongoose schema for Recipe
│   ├── routes
│   │   └── ReceipeRoute.js   # Recipe-related API routes
│   ├── server.js             # Main entry point for server
│   ├── config.js             # Configuration file for port and DB
│   └── package.json          # Dependencies for backend
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── Home.js       # Main React component for listing recipes
│   │   └── App.js            # React app entry point
│   └── package.json          # Dependencies for frontend
└── README.md
🔧 Troubleshooting
CORS Errors: If you encounter CORS issues, ensure your CORS middleware is configured properly in the backend.

MongoDB Connection Issues: Ensure your MongoDB is running and you have specified the correct connection string in the .env file.

404 Errors on Frontend: Ensure that you are using the correct API URL (http://localhost:3000/receipe).

💡 Future Enhancements
Add user authentication for personalized recipe management.
Implement search functionality to find recipes by title, ingredients, etc.
Add pagination to improve performance when fetching large sets of recipes.
