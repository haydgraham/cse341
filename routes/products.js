const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/", productsController.getAll);

// router.get('/:id', contactsController.getSingle);

router.post("/", productsController.createProduct);

// router.put('/:id', contactsController.updateContact);

// router.delete('/:id', contactsController.deleteContact);

module.exports = router;
