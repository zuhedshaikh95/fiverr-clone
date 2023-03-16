require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 8080;

const connect = require('./configs/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    response.send('Hello, Topper!');
});

app.listen(PORT, async () => {
    try {
        connect();
        console.log(`Listening at http://localhost:${PORT}`);
    }
    catch({ message }) {
        console.log('message');
    }
})