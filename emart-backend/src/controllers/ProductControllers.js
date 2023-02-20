const ProductModel = require("../models/ProductStructure");

const createProduct = async (req, res) => {
  let {
    vendor_Id,
    vendor_Name,
    vendor_Email,
    product_Id,
    productName,
    imgUrl,
    category,
    quantity,
    price,
    shortDesc,
    description,
    reviews,
    avgRating,
  } = req.body;

  let newProduct = new ProductModel({
    vendor_Id,
    vendor_Name,
    vendor_Email,
    product_Id,
    productName,
    imgUrl,
    category,
    quantity,
    price,
    shortDesc,
    description,
    reviews,
    avgRating,
  });

  newProduct
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your post has been created successfully.",
          data: newProduct,
        });
      }
    })
    .catch((dbError) => {
      console.log(dbError);
      return res.status(500).send({
        status: false,
        message: dbError,
      });
    });
};

const fetchProducts = (req, res) => {
  ProductModel.find({}, (err, products) => {
    if (!err) {
      return res.status(200).send({
        status: true,
        data: products,
      });
    }

    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  });
};

const updateProduct = async (req, res) => {
  let {
    _id,
    vendor_Id,
    vendor_Name,
    vendor_Email,
    product_Id,
    productName,
    imgUrl,
    category,
    quantity,
    price,
    shortDesc,
    description,
    reviews,
    avgRating,
  } = req.body;

  let updatedProduct = {
    _id: _id,
    vendor_Id: vendor_Id,
    vendor_Name: vendor_Name,
    vendor_Email: vendor_Email,
    product_Id: product_Id,
    productName: productName,
    imgUrl: imgUrl,
    category: category,
    quantity: quantity,
    price: price,
    shortDesc: shortDesc,
    description: description,
    reviews: reviews,
    avgRating: avgRating,
  };

  ProductModel.findByIdAndUpdate(
    _id,
    updatedProduct,
    { new: true },
    (err, product) => {
      if (!err) {
        return res.status(200).send({
          status: true,
          message: "Product has been updated",
          data: product,
        });
      }

      return res.status(500).send({
        status: false,
        message: "Server Issues",
      });
    }
  );
};

const deleteProduct = async (req, res) => {
  let { id } = req.params;

  ProductModel.findByIdAndRemove(id, (err) => {
    if (!err) {
      return res.status(200).send({
        status: true,
        message: "Product has been deleted",
      });
    }

    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  });
};

module.exports = { createProduct, fetchProducts, updateProduct, deleteProduct };
