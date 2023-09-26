const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Lesson 2 routes
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

// Lesson 3 routes
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;