const express = require("express");
const Router = express.Router();
const sql_connect = require("../connections/sql_connect");

Router.get("/", (req, res) => {
  res.render("admin/admin");
});
Router.post("/",  (req, res) => {
   sql_connect.query("select * from admin", (err, rows, fields) => {
    if (err) {
      console.log("err");
    } else {
      flag = false;
      rows.forEach((data) => {
        console.log(req.body, data);
        if (
          req.body.username === data.admin_username && req.body.userpassword === data.admin_password
        ) {
          flag = true;
        } else {
          console.log(err);
        }
      });
    }
    if (flag) {
      sql_connect.query(
        `select customer.first_name,customer.customer_id,booking.room_id,customer.phone_number,booking.room_details_id,customer.age from customer inner join(booking) on customer.customer_id=booking.customer_id `,
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          } else {
            res.render("admin/adminview", { data: rows });
            console.log(rows);
          }
        }
      );
    }
    else{
      console.log("no");
    }
  });
});

module.exports = Router;
