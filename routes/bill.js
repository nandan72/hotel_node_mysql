const express = require("express");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("bill/emptybill");
});

Router.get("/:id1/:id2", (req, res) => {
  console.log(req.params);
  var characters = "ABCDEFGHTUVWXTZklmnopqrstuvwxyz0123456789";
  var lenString = 15;
  var randomstring = "";
  var date = new Date();
  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }
  sqlconnection.query(
    `select payment_id from payment where room_id=${req.params.id1}`,
    (err, rows, fields) => {
      payment_id_object = Object.assign({}, ...rows);
      sqlconnection.query(
        `insert into bill(payment_id,transaction_id,payment_pending_status,generated_date) values(12,'${randomstring}','payed','${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}')`
      );
    }
  );

  sqlconnection.query(
    `select first_name,customer_id,phone_number from customer where customer_id=${parseInt(
      req.params.id2
    )}`,
    (err, rows1, fields) => {
      customer_object = Object.assign({}, ...rows1);
      sqlconnection.query(
        `select room_id,room_details_id,check_in_date,check_out_date from booking where room_id=${parseInt(
          req.params.id1
        )}`,
        (err, rows2, fields) => {
          room_object = Object.assign({}, ...rows2);
          sqlconnection.query(
            `select payment_id,total_price,no_of_days from payment where room_id=${parseInt(
              req.params.id1
            )}`,
            (err, rows3, fields) => {
                console.log(rows3);
              payment_object = Object.assign({}, ...rows3);
              sqlconnection.query(
                `select bill_id,transaction_id,generated_date from bill where payment_id=${(
                 payment_object.payment_id
                )}`,
                (err, rows4, fields) => {
                    bill_object = Object.assign({}, ...rows4);
                  res.render("bill/billdetails",{customer_object:customer_object,room_object:room_object,payment_object:payment_object,bill_object:bill_object});
                 
                }
              )
            }
          )
        }
      );
    }
  );
 
});

module.exports = Router;
