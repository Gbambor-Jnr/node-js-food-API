const Quote = require("../models/quotes");
const { validationResult } = require("express-validator");

exports.getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find();

    return res.status(200).json({ quotes: quotes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createQuotes = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Problem in the request body");
    error.statusCode = 422;
    throw error;
  }
  const author = req.body.author;
  const text = req.body.text;
  try {
    const quote = new Quote({
      author: author,
      text: text,
    });
    const newQuotes = await quote.save();

    res.status(201).json({ message: "New quote created succesfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
