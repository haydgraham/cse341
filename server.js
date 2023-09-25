const express = require('express');
const app = express();
const port = process.env.PORT || 3000


const homeRoute = require('./routes/home')
app.use('/', homeRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});