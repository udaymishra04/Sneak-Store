const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderController");
const protect = require("../middleware/auth");

router.post("/", protect, orderCtrl.createOrder);
router.get("/user/:userId", protect, orderCtrl.getOrdersByUser);
router.get("/", protect, orderCtrl.getAllOrders); // admin
router.patch("/:orderId", protect, orderCtrl.updateOrderStatus);
router.put("/:orderId", protect, orderCtrl.updateOrderStatus);

module.exports = router;
// Note: In a real app, you'd check if req.user.role === 'admin' for admin routes in the protect middleware or here.