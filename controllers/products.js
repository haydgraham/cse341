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

// const getSingle = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   });
// };

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
        response.error || "Some error occurred while creating the contact."
      );
  }
};

// const updateContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   // be aware of updateOne if you only want to update specific fields
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday
//   };
//   const response = await mongodb
//     .getDb()
//     .db()
//     .collection('contacts')
//     .replaceOne({ _id: userId }, contact);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//   }
// };

// const deleteContact = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
//   }
// };

module.exports = {
  getAll,
  //   getSingle,
  createProduct,
  //   updateContact,
  //   deleteContact
};
