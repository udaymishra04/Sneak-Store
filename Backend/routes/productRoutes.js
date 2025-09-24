// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const protect = require("../middleware/auth");

// public
router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getProductById);

// admin protected (example)
router.post("/", protect, productCtrl.createProduct);
router.put("/:id", protect, productCtrl.updateProduct);
router.delete("/:id", protect, productCtrl.deleteProduct);

module.exports = router;
// Note: In a real app, you'd check if req.user.role === 'admin' in the protect middleware or here.