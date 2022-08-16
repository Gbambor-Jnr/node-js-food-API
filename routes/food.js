const foodController = require("../controllers/food");
const { body } = require("express-validator");

const express = require("express");

const router = express.Router();

router.post(
  "/food",
  [
    body("name").trim().isLength({ min: 2 }),
    body("description").isLength({ min: 4 }),
    body("price").isLength({ min: 1 }),
  ],
  foodController.createFood
);

router.get("/food", foodController.getFood);

module.exports = router;
