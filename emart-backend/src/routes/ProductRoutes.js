const express = require("express");
const {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductControllers");
const router = express.Router();

router.post("/create-product", createProduct);

router.get("/fetch-products", fetchProducts);

router.put("/update-products", updateProduct);

router.delete("/delete-products/:id", deleteProduct);

module.exports = router;
