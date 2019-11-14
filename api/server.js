const express = require("express");
const helmet = require("helmet");
 const cors = require("cors");
const authRouter = require("../auth/authrouter.js");

const usersRouter = require("../users/userrouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
 server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.get("/", (req, res) => {
  res.send("Hello World from WebAuth III Challenge!");
});

module.exports = server;
