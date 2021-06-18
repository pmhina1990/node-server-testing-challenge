const express = require("express");
const helmet = require("helmet");
const companiesRouter = require("./companies/companies-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/companies", companiesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API IS WORKING" });
});

module.exports = server;