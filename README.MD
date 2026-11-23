# 📦 Inventory Management System

A full-stack Inventory Management System designed to manage product information and inventory operations efficiently.

🚧 **Project Status:** Work in Progress

## 🚀 Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Tools**
- Git & GitHub
- Postman
- VS Code

## ✨ Features

- Create new products
- Retrieve product information
- Update existing product details
- Delete products
- Automatically generate unique product IDs (`PROD001`, `PROD002`, etc.)
- MongoDB database integration
- RESTful API development

*Additional features are under development.*

## 📁 Project Structure

```text
Inventory-Management-System/
│
├── backend/
│   ├── src/
│   │   ├── Controllers/
│   │   ├── Database/
│   │   ├── Middlewares/
│   │   ├── Models/
│   │   ├── Routes/
│   │   └── Utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.MD
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kkg-max/Inventory-Management-System.git
```

### 2. Navigate to the project

```bash
cd Inventory-Management-System
```

### 3. Setup the Backend

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string.

Start the backend development server:

```bash
npm run dev
```

To start the backend without Nodemon:

```bash
npm start
```

### 4. Setup the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide a local development URL in the terminal. Open that URL in your browser.


## 🎯 Project Goals

- Build a complete full-stack inventory management application.
- Develop practical REST API development skills.
- Implement efficient database operations.
- Improve frontend and backend integration.
- Follow clean and maintainable coding practices.

## 👨‍💻 Developer

**Krish Kothiya**

- GitHub: [@kkg-max](https://github.com/kkg-max)

---

⭐ If you find this project interesting, consider giving it a star!

*This project is actively being developed. More features and improvements will be added over time.*