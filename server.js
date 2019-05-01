const express = require('express'); 
const helmet= require("helmet");
const morgan = require("morgan");

const postRouter = require("./data/postRouter");
const userRouter = require("./data/userRouter");
const server = express();

server.use(express.json(), helmet(), morgan('dev'))
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);


server.get('/', (req, res, next) => {
    res.send(`
      <h2>Hello</h2>
      <p>World</p>
      `);
  });



module.exports = server;