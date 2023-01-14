const express = require("express");
const app = express();
const sqlconnection = require("./connections/sql_connect");
const bookingRoute = require("./routes/booking");
const homeRoute = require("./routes/home");
const paymentRoute = require("./routes/payment");
const detailsRoute = require("./routes/details");
const loginRoute = require("./routes/login");
const adminRoute = require("./routes/admin");
const billRoute=require("./routes/bill")
const path=require("path")
const morgan = require("morgan");
const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})


app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use("/booking", bookingRoute);
app.use("/", homeRoute);
app.use("/payment", paymentRoute);
app.use("/details", detailsRoute);
app.use("/login", loginRoute);
app.use("/admin", adminRoute);
app.use("/not",billRoute)
app.use("/generatebill",billRoute)
console.log(process.env.DATABASE_PASSWORD);
app.listen(process.env.PORT_NUMBER, "127.0.0.1", () => {
  console.log("The Hotel server has been started");
});

sqlconnection.connect();
