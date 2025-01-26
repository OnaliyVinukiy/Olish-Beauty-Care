const express = require("express");
const {
  addFeaturedProduct,
  getFeaturedProducts,
  uploadMiddleware,
} = require("../controllers/featuredProductController");
const router = express.Router();

router.post("/featured", uploadMiddleware, addFeaturedProduct);
router.get("/featured-products", getFeaturedProducts);

module.exports = router;
