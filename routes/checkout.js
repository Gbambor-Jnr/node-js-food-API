const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const CheckoutController = require("../controllers/checkout");

router.post(
  "/checkout",
  //   [
  //     body("name").trim().isLength({ min: 1 }),
  //     body("city").trim().isLength({ min: 2 }),
  //     body("street").trim().isLength({ min: 2 }),
  //     body("post").trim().isLength({ min: 4 }),
  //   ],
  CheckoutController.createCheckout
);

router.post("/stripecheckout", CheckoutController.stripeCheckout);

module.exports = router;
