
const cors = require('cors');



const express = require('express');
const routes = require('./routes')

const app = express();


app.use(cors());
routes(app)

module.exports = app;