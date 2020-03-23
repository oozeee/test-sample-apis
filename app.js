const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Import routes
const sls = require('serverless-http');

// initialize the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/products', product);

module.exports.server = sls(app)