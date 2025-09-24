const express = require("express");
const router = express.Router();
const cartCtrl = require("../controllers/cartController");
const protect = require("../middleware/auth");

router.get("/:userId", protect, cartCtrl.getCart);
router.post("/:userId", protect, cartCtrl.addToCart);
router.patch("/:userId", protect, cartCtrl.updateCartItem);
router.delete("/:userId/:productId", protect, cartCtrl.removeFromCart);

module.exports = router;
// Note: In a real app, you'd verify that req.user.id === req.params.userId in the protect middleware or here.