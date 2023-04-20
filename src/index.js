require('dotenv').config()
const express = require('express');
const { routes } = require('./routes');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routes);

app.listen(port);