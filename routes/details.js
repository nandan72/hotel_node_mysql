const express = require("express");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("details/details");
});

Router.post("/", (req, res) => {
console.log(req.body);
sqlconnection.query('select * from customer',(err,rows,fields)=>{
  rows.forEach(ele=>{
    if(ele.customer_id==parseInt(req.body.customerid) && ele.password==(req.body.password)){
      sqlconnection.query(
        `select customer.first_name,customer.customer_id,booking.room_id,customer.phone_number,booking.room_details_id from customer inner join(booking) on customer.customer_id=booking.customer_id where customer.customer_id=${req.body.customerid}`,
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          } else {
            res.render("details/detailscustomer", { data: rows });
            console.log(rows);
          }
        }
      );
    }
    else{
      console.log("no");
    }
  })
})


});

module.exports = Router;
