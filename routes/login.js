const express = require("express");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("login/login");
});

Router.post("/", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const city = req.body.city;
  const number = req.body.number;
  const email = req.body.email;
  const birth = req.body.birth;
  const age = req.body.age;
  const password = req.body.password;
  console.log(req.body);
  sqlconnection.query(
    `insert into customer(first_name,last_name,phone_number,email,city,age,password,date_of_birth) values('${firstname}','${lastname}',${number},'${email}','${city}',${age},'${password}','${birth}')`
  );
  sqlconnection.query(
    `select customer_id from customer where password='${password}'`,
    (err, rows, fields) => {
      console.log(rows);
      res.render("login/customerid", { data: Object.assign({}, ...rows) });
    }
  );
});

module.exports = Router;
