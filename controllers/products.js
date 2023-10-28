const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("products")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  try {
    // Validate product ID
    const productId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: "Invalid product ID format." });
      return;
    }

    const result = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("products")
      .findOne({ _id: productId }); // findOne returns a single document

    // Check if product exists
    if (!result) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

const createProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
  };
  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("products")
    .insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the product."
      );
  }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
  };
  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("products")
    .replaceOne({ _id: productId }, product);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the product listing."
      );
  }
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("products")
    .deleteOne({ _id: productId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while deleting the product listing."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
