const { urlencoded } = require("express");
const express = require("express");
const { json, JSON } = require("sequelize");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("index");
});



module.exports = Router;
