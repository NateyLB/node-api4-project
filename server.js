const express = require('express');

const postRoutes = require('./posts/postRouter.js');
const userRoutes = require('./users/userRouter.js');

const server = express();

//global middleware 
server.use(express.json()); // built in middleware, no need to npm install it
server.use(logger);
server.use('/posts', postRoutes);
server.use('/users', userRoutes);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}
module.exports = server;
