const Food = require("../models/food");
const { validationResult } = require("express-validator");
const food = require("../models/food");

exports.getFood = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Invalid validation");
    err.statusCode = 422;
    throw err;
  }
  try {
    const food = await Food.find();
    res.status(200).json({ result: food });
    // return Food.find().then((food) => {
    //   res.status(200).json({ result: food });
    // });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createFood = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("problem with input data");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  const food = new Food({ name, description, price });

  try {
    return food.save().then((food) => {
      res.status(201).json({ message: "A New Food Created Succesfullly" });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
