require('dotenv').config({ path: '../.env' });


const mongoose = require('mongoose');

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASS);
const host = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority&authSource=admin&tls=true`;


mongoose.connect(connectionString).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});