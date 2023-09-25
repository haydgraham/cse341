const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
const uri = process.env.MONGODB_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let contactsCollection; // This will store the reference to the database collection

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        const db = client.db("test");  // Accessing the "contacts" database
        contactsCollection = db.collection("contacts"); // Accessing the "Contacts" collection

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with an error code
    }
}

// Start the database connection before starting the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

// Define the route to fetch contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await contactsCollection.find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
