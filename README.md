# 🍲 Recipe Manager

A simple and intuitive **Recipe Manager** web application built with **Node.js**, **Express**, and **MongoDB**. This app allows users to create, view, and manage their favorite recipes with ease.

## 🚀 Features

- **Add Recipes**: Users can add new recipes with details like ingredients, instructions, prep time, and more.
- **View Recipes**: All saved recipes can be viewed in a list format, with detailed information for each recipe.
- **Edit and Delete Recipes**: Manage your recipe collection by editing or deleting existing entries.
- **Responsive Design**: The UI is responsive, offering a smooth experience across devices.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Other**: CORS, RESTful APIs

## 📦 Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/recipe-manager.git
    ```

2. Navigate to the project directory:
    ```bash
    cd recipe-manager
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables. Create a `.env` file in the root directory and add the following:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    PORT=3000
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. The app will run at `http://localhost:3000`.

## 📝 Usage

- Open the app in the browser.
- Add new recipes by filling in the form.
- View the list of added recipes.
- Edit or delete any recipe as needed.

## 📄 API Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/receipe`          | Fetch all recipes         |
| POST   | `/receipe`          | Add a new recipe          |
| PUT    | `/receipe/:id`      | Update an existing recipe |
| DELETE | `/receipe/:id`      | Delete a recipe           |

## 🎨 Screenshots

![Home Page](./screenshots/homepage.png)
*Home page showing the list of recipes*

![Add Recipe](./screenshots/add-recipe.png)
*Add a new recipe form*

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/recipe-manager/issues) or open a new issue.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

Thanks to all the contributors and the open-source community for their valuable tools and resources!

---

_This project was built as a learning experience and for practicing web development with modern tools._
