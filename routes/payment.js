const express = require("express");
const sqlconnection = require("../connections/sql_connect");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("payment/payment");
});

Router.post("/", (req, res) => {
  flag = false;
  console.log(req.body);
  sqlconnection.query(
    "select customer.first_name,customer.customer_id,booking.room_id,customer.password from customer inner join(booking) on customer.customer_id=booking.customer_id",
    (err, rows, fields) => {
      console.log(rows);
      rows.forEach((ele) => {
        if (
          ele.customer_id == parseInt(req.body.customerid) &&
          ele.password === req.body.password &&
          ele.room_id == parseInt(req.body.roomid)
        ) {
          flag = true;
          console.log(true);
        } else {
          console.log(err);
        }
      });
      if (flag) {
        console.log("flag");

        sqlconnection.query(
          `select * from booking where room_id=${parseInt(req.body.roomid)}`,
          (err, rows2, fields) => {
            const object = Object.assign({}, ...rows2);
            console.log(object);
            sqlconnection.query(
              `select first_name from customer where customer_id=${object.customer_id}`,
              (err, rows3, fields) => {
                const object2 = Object.assign({}, ...rows3);
                console.log(object2);
                sqlconnection.query(
                  `select * from room_details where room_details_id=${object.room_details_id}`,
                  (err, rows4, fields) => {
                    const object3 = Object.assign({}, ...rows4);
                    console.log(object3);
                    date1 = parseInt(
                      object.check_in_date[8] + object.check_in_date[9]
                    );
                    date2 = parseInt(
                      object.check_out_date[8] + object.check_out_date[9]
                    );
                    console.log(date1,date2,);

                    total_days = date2 - date1;
                    total_price = total_days * object3.room_price;
                    console.log(total_price);
                    res.render("payment/paymentview", {
                      data1: object,
                      data2: object2,
                      total_days: total_days,
                      total_price: total_price,
                      data3: object3,
                    });
                  }
                );
              }
            );
          }
        );
      } else {
        res.send("Invalid Login Credentials,Try again....");
      }
    }
  );
});

Router.post("/confirm/:id1/:id2/:id3/:id4", (req, res) => {
  console.log(req.body, req.params);
  sqlconnection.query(
    `insert into payment(room_id,customer_id,no_of_days,payment_type,total_price) values (${parseInt(
      req.params.id1
    )},${parseInt(req.params.id2)},${parseInt(req.params.id3)},'${
      req.body.payment_type
    }',${req.params.id4})`,
    (err, rows, fileds) => {
      console.log(rows);
      res.render("bill/bill", {
        customer_id: req.params.id2,
        room_id: req.params.id1,
      });
    }
  );
});

module.exports = Router;
