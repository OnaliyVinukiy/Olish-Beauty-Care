/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const admin = require("../firebaseAdmin");

const uploadDirectory = path.resolve(
  __dirname,
  "../../../frontend/src/uploads"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 },
}).fields([
  { name: "productImage", maxCount: 1 },
  { name: "productImage2", maxCount: 1 },
  { name: "productImage3", maxCount: 1 },
]);

// Add product controller
exports.addFeaturedProduct = async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;
  const files = req.files;

  try {
    const imagePaths = {};

    if (files.productImage) {
      imagePaths.productImage = `src/uploads/${files.productImage[0].filename}`;
    }
    if (files.productImage2) {
      imagePaths.productImage2 = `src/uploads/${files.productImage2[0].filename}`;
    }
    if (files.productImage3) {
      imagePaths.productImage3 = `src/uploads/${files.productImage3[0].filename}`;
    }

    const productData = {
      productName,
      productDescription,
      productPrice,
      images: imagePaths,
    };

    // Save product data to Firebase Realtime Database
    const productRef = admin.database().ref("products").push();
    await productRef.set(productData);

    res
      .status(201)
      .json({ message: "Product added successfully", product: productData });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

exports.uploadMiddleware = upload;

exports.getFeaturedProducts = async (req, res) => {
  try {
    const productsRef = admin.database().ref("products");
    const snapshot = await productsRef.once("value");
    if (snapshot.exists()) {
      const products = snapshot.val();
      const productArray = Object.keys(products).map((key) => ({
        id: key,
        ...products[key],
      }));

      res.status(200).json({ products: productArray });
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
exports.uploadMiddleware = upload;
