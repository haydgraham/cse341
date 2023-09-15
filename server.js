var express = require('express');

var app = express();

const routes = require('express').Router();

routes.get('/', (req, res, next) => {
    res.json('awesome person');
});

app.listen(3000, () => {
    console.log('server is running on 3000');
});