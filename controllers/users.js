const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("users")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  try {
    // Validate product ID
    const userId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: "Invalid user ID format." });
      return;
    }

    const result = await mongodb
      .getDb()
      .db("ecommerce")
      .collection("users")
      .findOne({ _id: userId }); // findOne returns a single document

    // Check if user exists
    if (!result) {
      res.status(404).json({ error: "User not found." });
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

const createUser = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating new user.");
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("users")
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the user info."
      );
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("ecommerce")
    .collection("users")
    .deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
