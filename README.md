# 👟 Sneakhead – Full Stack Sneaker E-Commerce Store

Sneakhead (Sneak Store) is a **full-stack MERN e-commerce web application** for sneaker lovers.  
It provides a seamless shopping experience with authentication, product browsing, cart management, and order tracking.

---

## 🔗 Project Links
- **Frontend Repo:** [Frontend](./Frontend)  
- **Backend Repo:** [Backend](./Backend)  
- **Live Demo:** *(Add your deployed link here once available)*  

---

## ✨ Features
- 👤 **User Authentication** (Signup, Login, JWT-based Auth)
- 🛒 **Cart Management** with quantity adjustments
- ⭐ **Product Ratings & Reviews**
- 📦 **Order Placement & History**
- 🔍 **Product Filters & Search**
- ⚡ **Animations & Skeleton Loaders**
- 🌐 **Full-stack deployment ready** (React + Express + MongoDB)

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React (with Vite)
- React Router DOM
- Context API (Cart & Auth state management)
- Axios for API requests
- TailwindCSS + Custom CSS
- React Hot Toast (notifications)
- Framer Motion (animations)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- RESTful APIs (`/auth`, `/products`, `/cart`, `/orders`)
- CORS enabled for frontend-backend communication

---

## 📂 Project Structure

Sneak-Store/
├── Backend/ # Express + MongoDB API
│ ├── config/ # Database connection
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── controllers/ # Route controllers
│ ├── server.js # App entry point
│ └── package.json
│
├── Frontend/ # React + Vite client
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Route-based pages
│ │ ├── context/ # CartProvider, AuthProvider
│ │ ├── services/ # API calls
│ │ └── styles/ # CSS
│ ├── vite.config.js
│ └── package.json
│
├── .gitignore
├── README.md
└── package.json # (optional root-level scripts)

2️⃣ Setup Backend

cd Backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start server:

npm start

Backend runs at: http://localhost:5000

3️⃣ Setup Frontend

cd ../Frontend
npm install

Create a .env file:
VITE_API_BASE_URL=http://localhost:5000/api

Start frontend:
npm run dev

Frontend runs at: http://localhost:5173

## 📂 Project Structure
