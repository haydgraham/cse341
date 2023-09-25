// This creates an express router object
const routes = require('express').Router();

// This brings in the functionality of the controllers module so we have access to awesomeFunction
const myController = require('../controllers');

// Here we are creating an endpoint at the root directory '/'
routes.get('/', myController.awesomeFunction);


module.exports = routes;