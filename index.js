const express = require('express');
require('dotenv').config();
const cors = require('cors'); //CORS

const port = process.env.PORT;

const apiRoutes = require('./api-routes.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api', apiRoutes);

server.listen(port, () =>
  console.log(`Server listening on port${port} `)
);