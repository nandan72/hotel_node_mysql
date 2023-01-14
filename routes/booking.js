const express = require("express");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  sqlconnection.query("select room_id from booking", (err, rows, fields) => {
  const a=[]
   rows.forEach(ele=>{
    a.push(ele.room_id)
   })
 
   a.sort((a,b)=>a-b)
  
    res.render("booking/bookingpage", { data: a });
  });
  
});

Router.get("/:id", (req, res) => {
  res.render("booking/rooms", { room_id: req.params.id });
});

Router.post("/:id", (req, res) => {
  flag = false;
  console.log(req.body, req.params);
  sqlconnection.query("select * from customer", (err, rows, fields) => {
    rows.forEach((data) => {
      if (
        data.customer_id === parseInt(req.body.customerid) &&
        data.password === req.body.customerpassword
      ) {
        flag = true;
      } else {
        console.log(err);
      }
    });
    if (flag) {
      res.render("booking/roombook", {
        customerid: parseInt(req.body.customerid),
        room_id: req.params.id,
      });
    } else {
      res.send(
        "Inavlid Customer ID or Customer Password. Create or reset your credentials."
      );
    }
  });
});

Router.post("/:id1/:id2", (req, res) => {
  var price = 0;
  console.log(req.body,"hello");
  sqlconnection.query(
    `select * from room_details where room_type='${req.body.room_type}'`,
    (err, rows, fields) => {
      console.log(rows);
      const object = Object.assign({}, ...rows);
      sqlconnection.query(
        `insert into booking values(${parseInt(req.params.id1)},${parseInt(
          req.params.id2
        )},${parseInt(object.room_details_id)},'${req.body.checkindate}','${
          req.body.checkoutdate
        }')`,
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          }
        }
      );
      res.render("booking/bookingconfirm", {
        room_id: req.params.id1,
        customerid: req.params.id2,
        data: req.body,
        room_price: object.room_price,
      });
    }
  );
});

module.exports = Router;
