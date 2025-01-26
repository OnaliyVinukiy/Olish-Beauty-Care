/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */
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
