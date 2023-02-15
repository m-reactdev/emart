const express = require("express");
const {
  createProduct,
  fetchProducts,
  updateProduct,
} = require("../controllers/ProductControllers");
const router = express.Router();

router.post("/create-product", createProduct);

router.get("/fetch-products", fetchProducts);

router.put("/api/update-products", updateProduct);

module.exports = router;
