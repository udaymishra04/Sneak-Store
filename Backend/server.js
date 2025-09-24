const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
var cors = require('cors')


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Connect to MongoDB (only once using connectDB)
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
