const express = require("express");
const { body } = require("express-validator");
const QuoteController = require("../controllers/quotes");

const router = express.Router();

router.get("/allQuotes", QuoteController.getQuotes);
router.post(
  "/createQuote",
  [
    body("author").trim().isLength({ min: 3 }),
    body("text").trim().isLength({ min: 3 }),
  ],
  QuoteController.createQuotes
);

module.exports = router;
