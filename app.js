const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const foodRoute = require("./routes/food");
const quoteRoute = require("./routes/quotes");
const checkoutRoute = require("./routes/checkout");
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //the wildcard * means allow for all site
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());
app.use(foodRoute);
app.use(quoteRoute);
app.use(checkoutRoute);
// app.use(cors());

app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://ikenna:Cornelik@cluster0.kytwgsm.mongodb.net/Food?retryWrites=true`
  )
  .then((result) => app.listen(8092))
  .catch((err) => console.log(err));

// `mongodb+srv://ikenna:Cornelik@cluster0.kytwgsm.mongodb.net/Food?retryWrites=true`
