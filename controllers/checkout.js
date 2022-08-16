const Checkout = require("../models/checkout");
const { validationResult } = require("express-validator");
const stripe = require("stripe")(
  "sk_test_51LWEIjLNnNunaJbo5FbWAIwFK8cQq861yuDnfMSU3HUEKbAG3QEiz81ETM9Cg2FblPD7Uv4WZIuEOSZTAtDodknV00CZGVjG1p"
);
const uuid = require("uuid").v4;

exports.createCheckout = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Problem with The Request body ");
    error.statusCode = 422;
    throw error;
  }
  //   const name = req.body.name;
  //   const city = req.body.city;
  //   const post = req.body.post;
  //   const street = req.body.street;
  const user = req.body.user;
  const items = req.body.items;
  try {
    const checkout = new Checkout({
      user: user,
      items: items,
    });
    const result = await checkout.save();
    return res.status(201).json({ message: "Checkout Succesfully created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.stripeCheckout = async (req, res, next) => {
  const { token, products } = req.body;
  let status;
  let error;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotency_key = uuid(); //this makes sure or customers are not charged twice

    const charge = await stripe.charges.create(
      {
        amount: products.amount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${products.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotency_key }
    );
    consle.log("charge: ", { charge });
    status = "success";
  } catch (err) {
    console.error("Error:", err);
    status = "failure";
  }
  res.json({ error, status });
};
