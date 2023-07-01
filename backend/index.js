const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require('./db/conn');
const cors = require('cors');
const app = express();
let PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api',require('./router/user'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Backend server is running on ${PORT}`);
})