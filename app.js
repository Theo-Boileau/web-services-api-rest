const express = require('express'); //framework
const helmet = require('helmet'); //Configure HTTP Headers
const bodyParser = require('body-parser'); // Parse the body in an object req.body
const mongoose = require('mongoose'); // DataBase
const compression = require('compression'); // Compression for quick server response


const app = express(); // app creation
app.use(helmet());
app.use(compression());

//connect to MongoDB
const DB = 'mongodb+srv://root:root@cluster0.0xxla11.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err);
    })

app.use(bodyParser.json())


// import routes
const objectRoutes = require('./routes/object');

app.use('/api/objects', objectRoutes);

module.exports = app;